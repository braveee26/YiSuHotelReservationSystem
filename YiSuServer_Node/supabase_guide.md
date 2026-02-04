# Supabase 接入与使用详细指南

本文档将教你如何将本 Node.js 后端项目连接到你的 Supabase 云数据库。

## 1. 准备工作

1.  **注册与建立项目**：访问 [Supabase 官网](https://supabase.com/)，创建一个新项目。
2.  **执行 SQL**：进入 Supabase 控制台的 **SQL Editor**，将之前提供的建表脚本复制进去执行。

## 2. 获取连接信息

在 Supabase 控制台进入 **Project Settings -> API**：

-   **Project URL**：你的项目 API 地址（例如 `https://xyz.supabase.co`）。
-   **anon public** (API Key)：匿名的公共 Key。

## 3. 配置项目变量

1.  在 `YiSuServer_Node` 目录下，找到 `.env.example` 文件。
2.  **复制并重命名** 为 `.env`。
3.  将其中的占位符替换为你刚才获取的真实值：
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

-   **获取所有酒店**：`GET http://localhost:3000/api/hotels`
-   **获取特定酒店详情**：`GET http://localhost:3000/api/hotels/1`
-   **用户注册**：`POST http://localhost:3000/api/users/register` (参数见代码)
-   **房型查询**：`GET http://localhost:3000/api/rooms/hotel/1`

## 6. 在 Supabase Dashboard 管理数据

你可以随时通过 Supabase 控制台的 **Table Editor** 界面手动添加或修改数据，后端接口会实时反映这些变化。
