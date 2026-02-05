# Supabase 接入与使用详细指南

本文档将教你如何将本 Node.js 后端项目连接到你的 Supabase 云数据库。

## 1. 准备工作

1. **注册与建立项目**：访问 [Supabase 官网](https://supabase.com/)，创建一个新项目。
2. **执行 SQL**：进入 Supabase 控制台的 **SQL Editor**，将之前提供的建表脚本复制进去执行。

## 2. 获取连接信息

在 Supabase 控制台进入 **Project Settings -> API**：

- **Project URL**：你的项目 API 地址（例如 `https://xyz.supabase.co`）。
- **anon public** (API Key)：匿名的公共 Key。

## 3. 配置项目变量

1. 在 `YiSuServer_Node` 目录下，找到 `.env.example` 文件。
2. **复制并重命名** 为 `.env`。
3. 将其中的占位符替换为你刚才获取的真实值：
   ```env
   SUPABASE_URL=https://your-project-url.supabase.co
   SUPABASE_KEY=your-anon-key
   PORT=3000
   ```

## 4. 运行后端服务

在 `YiSuServer_Node` 目录下打开终端，运行：

```bash
# 安装依赖 (如果你还没安装过)
npm install

# 启动服务器
node server.js
```

服务器启动后，你可以在浏览器访问 `http://localhost:3000` 看到欢迎信息。

## 5. 常用 API 测试

- **获取所有酒店**：`GET http://localhost:3000/api/hotels`
- **获取特定酒店详情**：`GET http://localhost:3000/api/hotels/1`
- **用户注册**：`POST http://localhost:3000/api/users/register` (参数见代码)
- **房型查询**：`GET http://localhost:3000/api/rooms/hotel/1`

## 6. 在 Supabase Dashboard 管理数据

你可以随时通过 Supabase 控制台的 **Table Editor** 界面手动添加或修改数据，后端接口会实时反映这些变化。

# Supabase 图片存储集成指南

本文档介绍了如何使用 Supabase Storage 管理酒店与房型图片。

## 前置配置（已完成）

- **Bucket Name**: `hotel-assets`
- **Bucket Type**: `Public` (必须开启 Public 属性)
- **依赖**: 确保项目中已初始化 `supabase` 客户端实例。

---

## 核心功能代码实现

以下代码示例展示了图片的上传、获取链接及删除操作。

```javascript
/**
 * 1. 上传图片 (Upload)
 * 适用场景: 管理员后台添加/编辑酒店或房型
 * @param {string} hotelId - 酒店ID，用于文件归类
 * @param {File} file - 前端获取的文件对象 (e.g., event.target.files[0])
 * @returns {Promise<string|null>} 返回存储路径 (path) 用于存入数据库，失败返回 null
 */
async function uploadHotelImage(hotelId, file) {
  // 构造唯一路径: hotel_{id}/{timestamp}_{filename}
  // 使用时间戳避免文件名冲突
  const filePath = `hotel_${hotelId}/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("hotel-assets") // 目标 Bucket
    .upload(filePath, file, {
      cacheControl: "3600", // 浏览器缓存时长 (秒)
      upsert: false, // false: 若文件已存在则报错; true: 覆盖
    });

  if (error) {
    console.error("Supabase 上传失败:", error.message);
    return null;
  }

  // 返回 path (例如: "hotel_12/17098822_lobby.jpg")
  return data.path;
}

/**
 * 2. 获取图片公开链接 (Get Public URL)
 * 适用场景: 前端展示 (<img src="..." />)
 * 说明: Public Bucket 操作不消耗数据库请求额度，直接在客户端生成。
 * @param {string} path - 数据库中存储的图片路径
 * @returns {string} 完整的可访问 URL
 */
function getImageUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage.from("hotel-assets").getPublicUrl(path);

  // 返回示例: https://<project-ref>.supabase.co/storage/v1/object/public/hotel-assets/...
  return data.publicUrl;
}

/**
 * 3. 删除图片 (Delete)
 * 适用场景: 酒店/房型删除，或更换图片时清理旧图
 * @param {string} path - 数据库中存储的图片路径
 */
async function deleteImage(path) {
  const { data, error } = await supabase.storage
    .from("hotel-assets")
    .remove([path]); // 接收数组，支持批量删除

  if (error) {
    console.error("Supabase 删除失败:", error.message);
  } else {
    console.log("图片已从存储桶删除");
  }
}
```

# Supabase 权限策略配置 (RLS) 文档

**目标存储桶 (Bucket):** `hotel-assets`
**配置状态:** ✅ 已部署
**说明:** 本配置用于确保存储桶的安全性和可用性，严格区分了“公开访问”与“授权管理”。

---

## 策略 1：公开读取 (Public Read)

**用途:** 允许所有用户（包括前端页面未登录的访客）通过 URL 查看和下载图片。

- **策略名称 (Policy Name):** `Allow Public Read`
- **允许操作 (Allowed Operations):** `SELECT` (仅下载/查看)
- **目标角色 (Target Roles):** `public` (默认/所有人/Anon)
- **策略定义 (Policy Definition):**
  ```sql
  bucket_id = 'hotel-assets'
  ```

## 策略 2：授权写入与管理 (Authenticated Write)

**用途:** 限制只有经过身份验证（已登录）的用户（如后台管理员、商家）才能上传、修改或删除文件，防止恶意篡改。

- **策略名称 (Policy Name):** `Allow Auth Uploads`
- **允许操作 (Allowed Operations):** `INSERT`, `UPDATE`, `DELETE` (增、改、删)
- **目标角色 (Target Roles):** `authenticated` (仅限已登录用户)
- **策略定义 (Policy Definition):**
  **SQL**

  ```
  bucket_id = 'hotel-assets'
  ```

# 开发注意事项

1. **上传文件 (Upload):** - 前端调用上传接口时，客户端必须持有有效的 Session Token (即用户必须处于登录状态)，否则 Supabase 会返回 `403 Forbidden` 或 `new row violates row-level security policy` 错误。
2. **读取文件 (View):** - 使用 `getPublicUrl` 获取的链接无需携带 Token，任何人都可访问。

# 后端功能更新日志 (2026-02-04)

### 新增 API 接口

- **获取筛选标签**: `GET /api/hotels/attributes`
  - **功能**: 从 `hotel_attribute` 表获取所有可用的酒店标签（如“近地铁”、“免费取消”等）。
  - **用途**: 用于前端首页和列表页的动态筛选展示。

### 中间件增强 (Middleware)

为了方便调试和监控，后端新增了以下中间件：

1. **请求日志 (Request Logging)**:
   - 自动记录所有进入 API 的请求。
   - 日志格式包含：`[时间戳] Method URL` 以及 Query 参数和 Body 内容。

2. **全局错误处理 (Global Error Handler)**:
   - 统一捕获应用中的未处理异常。
   - 返回标准的 JSON 错误响应 `{ error: 'Internal server error', message: ... }` 并打印堆栈跟踪。

## 数据库建表语句

```sql
-- 1. 用户表 (user)
CREATE TABLE IF NOT EXISTS "user" (
    user_id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    role SMALLINT NOT NULL DEFAULT 0, -- 0=商户, 1=管理员
    avatar VARCHAR(255),
    real_name VARCHAR(50),
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    id_card VARCHAR(255),
    create_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 2. 酒店表 (hotel)
CREATE TABLE IF NOT EXISTS "hotel" (
    hotel_id BIGSERIAL PRIMARY KEY,
    merchant_id BIGINT REFERENCES "user"(user_id),
    hotel_name_cn VARCHAR(100) NOT NULL,
    hotel_name_en VARCHAR(200) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    detail_address VARCHAR(200) NOT NULL,
    star_level SMALLINT NOT NULL CHECK (star_level BETWEEN 1 AND 5),
    open_date DATE NOT NULL,
    description TEXT,
    nearby_attractions VARCHAR(500),
    traffic_info VARCHAR(500),
    mall_info VARCHAR(500),
    online_status SMALLINT NOT NULL DEFAULT 0, -- 0=下线, 1=上线
    audit_status SMALLINT NOT NULL DEFAULT 1, -- 0=不通过, 1=审核中, 2=通过
    audit_info VARCHAR(500),
    create_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 3. 酒店属性表 (hotel_attribute)
CREATE TABLE IF NOT EXISTS "hotel_attribute" (
    attr_id BIGSERIAL PRIMARY KEY,
    attr_name VARCHAR(50) NOT NULL UNIQUE,
    attr_desc VARCHAR(200)
);
-- 4. 酒店-属性关联表 (hotel_attr_relation)
CREATE TABLE IF NOT EXISTS "hotel_attr_relation" (
    id BIGSERIAL PRIMARY KEY,
    hotel_id BIGINT REFERENCES "hotel"(hotel_id) ON DELETE CASCADE,
    attr_id BIGINT REFERENCES "hotel_attribute"(attr_id) ON DELETE CASCADE,
    UNIQUE(hotel_id, attr_id)
);
-- 5. 酒店图片表 (hotel_image)
CREATE TABLE IF NOT EXISTS "hotel_image" (
    image_id BIGSERIAL PRIMARY KEY,
    hotel_id BIGINT REFERENCES "hotel"(hotel_id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 1,
    image_desc VARCHAR(200)
);
-- 6. 房型表 (room_type)
CREATE TABLE IF NOT EXISTS "room_type" (
    room_id BIGSERIAL PRIMARY KEY,
    hotel_id BIGINT REFERENCES "hotel"(hotel_id) ON DELETE CASCADE,
    room_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    bed_type VARCHAR(50) NOT NULL,
    area DECIMAL(5,1),
    stock INT NOT NULL DEFAULT 0,
    include_breakfast SMALLINT NOT NULL DEFAULT 0, -- 0=不含, 1=含
    max_people SMALLINT NOT NULL DEFAULT 2,
    description TEXT,
    create_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- 7. 房型图片表 (room_image)
CREATE TABLE IF NOT EXISTS "room_image" (
    image_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT REFERENCES "room_type"(room_id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    sort_order SMALLINT NOT NULL DEFAULT 1,
    image_desc VARCHAR(200)
);
-- 8. 优惠表 (discount)
CREATE TABLE IF NOT EXISTS "discount" (
    discount_id BIGSERIAL PRIMARY KEY,
    discount_type SMALLINT NOT NULL, -- 0=节日折扣, 1=套餐优惠
    target_type SMALLINT NOT NULL, -- 0=全酒店, 1=指定酒店, 2=指定房型
    target_id BIGINT NOT NULL,
    discount_rule VARCHAR(100) NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status SMALLINT NOT NULL DEFAULT 0, -- 0=未生效, 1=生效中, 2=已过期
    description VARCHAR(500)
);
```