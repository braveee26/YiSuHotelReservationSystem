# Hotel App

---

## 技术栈

| 技术      | 版本    | 说明                           |
| --------- | ------- | ------------------------------ |
| Taro      | 4.1.11  | 跨端开发框架                   |
| React     | ^18.0.0 | 前端框架                       |
| Taroify   | ^0.9.0  | UI 组件库（有赞 Vant Taro 版） |
| Zustand   | ^4.5.0  | 状态管理                       |
| SCSS      | -       | 样式预处理                     |
| Webpack 5 | ^5.91.0 | 构建工具                       |

### 组件库 - Taroify

本项目使用 [Taroify](https://taroify.github.io/taroify.com/) 作为 UI 组件库，这是有赞 Vant 组件库的 Taro 适配版本。

**已使用的组件：**

- `Button` - 按钮
- `Cell / Cell.Group` - 单元格
- `Field` - 输入框
- `Tabs / Tabs.TabPane` - 选项卡
- `Image` - 图片
- `Switch` - 开关
- `@taroify/icons` - 图标

---

## 环境配置

### 1. 安装 Node.js

确保已安装 Node.js 16+：

```bash
node -v  # 检查版本
```

### 2. 安装依赖

```bash
cd hotel-app-v4
npm install
```

### 3. 运行 H5 开发环境

```bash
npm run dev:h5
```

访问 http://localhost:10086/

### 4. 构建微信小程序

```bash
npm run dev:weapp
```

构建产物会输出到 `dist/` 目录。

---

## 微信开发者工具测试

### 步骤

1. **下载微信开发者工具**https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. **导入项目**
   - 打开微信开发者工具
   - 选择「导入项目」
   - 项目目录选择：`hotel-app-v4/dist`（构建产物目录）
   - AppID 可使用测试号或留空

3. **编译运行**
   - 确保已运行 `npm run dev:weapp` 保持监听
   - 微信开发者工具会自动热更新

### 常见问题

| 问题                | 解决方案                                    |
| ------------------- | ------------------------------------------- |
| "pages/xxx" 重复    | 检查 `app.config.js` 中是否有重复的页面路径 |
| vendors.js 体积过大 | 正常现象，开发模式下不压缩                  |
| SourceMap 加载超时  | 可忽略，不影响功能                          |

---

## 项目结构

```
YiSuHotelReservationSystem/
├── hotel-app-v4/       # 前端跨端项目 (Taro + React)
│   ├── src/            # 源代码
│   └── android/        # Android 原生工程
├── YiSuServer_Node/    # 后端项目 (Node.js + Express)
│   ├── routes/         # API 路由
│   ├── config/         # Supabase 客户端配置
│   └── server.js       # 入口文件
└── YiSuSystem/         # 旧版 Java 后端脚手架 (备用)
```

---

## Node.js 后端启动 (YiSuServer_Node)

本项目后端现已迁移至 Node.js 环境，并无缝集成 Supabase 云数据库。

1.  **进入目录**：`cd YiSuServer_Node`
2.  **安装依赖**：`npm install`
3.  **配置环境**：根据 `.env.example` 创建 `.env` 文件，并填入你的 Supabase `URL` 和 `Key`。
4.  **启动服务**：`node server.js`

详细的 Supabase 接入流程请参考 [supabase_guide.md](./YiSuServer_Node/supabase_guide.md)。

---

## 多人协作说明 (Supabase)

为了让开发伙伴共同使用同一个云数据库，请按照以下步骤操作：

1.  **添加协作者**：
    -   登录 [Supabase Dashboard](https://supabase.com/dashboard)。
    -   进入 **Project Settings -> Members**。
    -   点击 **Invite Member**，输入伙伴的邮箱并分配相应权限。
2.  **共享环境变量**：
    -   将你的 `.env` 文件中的 `SUPABASE_URL` 和 `SUPABASE_KEY` 安全地共享给伙伴。建议伙伴在本地创建自己的 `.env` 文件。
3.  **模式同步**：
    -   如果数据库结构发生变动（例如运行了新的 SQL 脚本），请将变更后的 SQL 脚本共享给伙伴。

---

## API Keys 安全选择指南

Node.js 后端在选择 API Key 时应遵循以下原则：

-   **使用 `anon` (Publishable key)**: 适用于绝大多数常规业务。它受 RLS (Row Level Security) 策略约束，即即使用户拿到了 Key，也只能访问权限允许的数据。
-   **谨慎使用 `service_role` (Secret key)**: 该 Key 具有最高权限（绕过 RLS）。**仅当**你在后端执行一些系统级管理操作（如批量修改用户角色、管理系统配置）且能确保 Key 不外泄时才使用。

> [!CAUTION]
> 绝对不要在前端代码（Taro/ReactNative）中直接硬编码 `service_role` key，否则攻击者可以轻易清空你的整个数据库！

---

## 常用命令速查

### 开发相关

```bash
npm run dev:h5      # H5 开发模式
npm run dev:weapp   # 微信小程序开发模式
```

### 构建相关

```bash
npm run build:h5    # H5 生产构建
npm run build:weapp # 微信小程序生产构建
```

### Android 相关

```bash
npx cap sync        # 同步 Web 资源到 Android 项目
npx cap open android # 打开 Android Studio
npx cap run android  # 直接运行到模拟器/真机
```

---

# Android 端环境配置与运行避坑指南

本文档总结了在 Windows 环境下运行本项目 Android 端时可能遇到的常见问题及解决方案。请务必按照以下步骤配置，以避免环境报错。

## 1. 基础运行步骤

⚠️ **重要提示**：所有终端命令必须在项目根目录（`hotel-app-v4`）执行，不要进入 `android` 目录执行命令。

1. **安装依赖**：

   ```bash
   npm install
   ```

2. **构建 Web 资源**：

   ```bash
   npm run build:h5
   ```

3. **同步资源到 Android**：

   ```bash
   npx cap sync
   ```

4. **打开 Android Studio**：

   ```bash
   npx cap open android
   ```

## 2. 关键配置文件修改（已经做好了）

由于国内网络环境和依赖版本冲突问题，必须修改 `android/build.gradle` 文件。

**文件路径**：`android/build.gradle` (项目级 Gradle 文件，非 app 级)

请用以下代码完全替换该文件内容：

```gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        // 【新增】阿里云镜像加速（解决下载 Gradle 卡死/超时问题）
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/public' }

        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.7.2'
        classpath 'com.google.gms:google-services:4.4.2'
    }
}

apply from: "variables.gradle"

allprojects {
    repositories {
        // 【新增】阿里云镜像加速
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/public' }

        google()
        mavenCentral()
    }

    // 【新增】强制解决 Kotlin 版本冲突的核心代码
    // 解决 "Duplicate class kotlin.collections.jdk8..." 报错
    configurations.all {
        resolutionStrategy {
            force 'org.jetbrains.kotlin:kotlin-stdlib:1.8.22'
            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.22'
            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.22'
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## 3. 解决中文路径报错（已经做好了）

如果你的项目路径包含中文字符（例如：`D:\作业\实训`），Gradle 可能会报错。

**解决方案：**

1. 打开 `android/gradle.properties` 文件。
2. 在文件末尾添加以下代码：

```properties
android.overridePathCheck=true
```

## 4. 模拟器选择（解决白屏/语法报错）

**问题描述**：如果启动 APP 后显示白屏，并报错 `Uncaught SyntaxError: Unexpected token =`。

**原因**：旧版模拟器（如 Pixel 4 / API 30）的 WebView 内核版本过低，不支持新版 JS 语法。

**解决方案**：

1. 在 Android Studio 的设备管理器 (Device Manager) 中点击 **Create Device**。
2. 选择任意设备（推荐 Pixel 7 或 8）。
3. **关键步骤**：在 System Image 选择界面，务必下载并选择 **API 34** 或 **API 35** (Android 14/15)。
4. 使用这个新创建的模拟器运行项目即可。

## 5. 其他常见问题 QA

**Q: Gradle Sync 进度条一直卡住或下载失败？**
A: 请确保已经配置了第 2 步中的阿里云镜像。如果依然卡住，尝试点击 Android Studio 右侧的 Gradle 面板，右键项目选择 **Reload Gradle Project**。

**Q: Android Studio 提示 Windows Defender 警告？**
A: 强烈建议点击弹窗中的 **Automatically** 或 **Exclude folders**。这会自动将项目目录加入杀毒软件白名单，显著提升编译速度。

**Q: 运行显示 Timeout waiting for lock？**
A: 這是 Gradle 进程锁死。去 `C:\Users\你的用户名\.gradle\wrapper\dists` 下删除对应的 Gradle 版本文件夹，然后重启 Android Studio 让它重新下载。

---

## 项目开发文档补充 (2026-02-01)

### 1. 页面 URL 地址

根据 `src/app.config.js` 配置，当前项目包含以下页面路由：

**主包页面：**

- `/pages/home/index` - 首页
- `/pages/user/index` - 个人中心
- `/pages/order/index` - 订单页
- `/pages/auth/login/index` - 登录页
- `/pages/auth/register/index` - 注册页

**分包页面 (SubPackages)：**

- `pages/hotel` (酒店相关):
  - `/pages/hotel/list/index` - 酒店列表
  - `/pages/hotel/detail/index` - 酒店详情
  - `/pages/hotel/booking/index` - 酒店预订

- `pages/sub-main` (主要功能子页):
  - `/pages/sub-main/favorites/index` - 收藏页
  - `/pages/sub-main/messages/index` - 消息中心
  - `/pages/sub-main/reviews/index` - 点评页

- `pages/sub-user` (用户相关子页):
  - `/pages/sub-user/contacts/index` - 常用入住人
  - `/pages/sub-user/settings/index` - 设置页

### 2. 图标引入方式

本项目采用了混合图标引入策略：

1.  **底部导航栏图标 (TabBar)**：
    - 采用 **本地图片资源** 方式引入。
    -   采用 **本地图片资源** 方式引入。
    -   路径：`src/assets/tab/`
    -   命名规范：`tab-{name}.png` (未选中) 和 `tab-{name}-active.png` (选中)。
    -   在 `src/components/TabBar/index.jsx` 中直接 `import` 使用。

2.  **通用 UI 图标**：
    -   通过 **@taroify/icons** 组件库。
    -   引入方式：`import { IconName } from '@taroify/icons'`
    -   注意：已移除 babel-plugin-import 配置，直接使用具名导入即可支持 Tree-shaking。

### 3. 可复用组件与视觉升级

目前项目中封装了以下主要可复用组件，并对核心界面进行了视觉升级：

#### HotelCard (酒店卡片)

展示酒店基本信息的通用卡片组件，用于首页推荐、收藏列表、酒店列表等。

-   **路径**：`src/components/HotelCard.jsx`
-   **使用示例**：

```jsx
import HotelCard from "@/components/HotelCard";

<HotelCard
  hotel={{
    id: 1,
    name: "酒店名称",
    image: "图片URL",
    stars: 5,
    rating: 4.8,
    reviews: 100,
    price: 800,
    tags: ["标签1", "标签2"],
    distance: "距离文本",
    badges: ["推荐"],
  }}
  onClick={() => handleClick(1)}
/>;
```

#### OrderCard (订单卡片 - User Page 专用)

个人中心订单选项卡内的高级订单卡片，支持多种筛选状态。

-   **路径**：`src/pages/user/index.jsx` (作为子组件实现)
-   **视觉特性**：
    -   采用模块化圆角设计，区分酒店基本信息与价格操作区。
    -   支持 `待入住` 等不同状态的色彩提示。

#### User Interface (个人中心视觉升级)

对个人中心进行了全方位的视觉美化：

-   **玻璃拟态 (Glassmorphism)**：用户信息卡片采用毛玻璃背景。
-   **动态渐变**：顶部背景采用 `linear-gradient` 渐变色，提升高端感。
-   **平滑动画**：选项卡切换带指示条位移微动效。

#### TabBar (自定义底部导航)

替代原生 TabBar，支持更灵活的样式定制和图标控制。

-   **路径**：`src/components/TabBar/index.jsx`
-   **使用示例**：

```jsx
import TabBar from "@/components/TabBar";

// current 为当前 tab 的索引 (0-4)
<TabBar current={0} />;
```

#### 其他组件 (开发中)

-   `CitySelector` (src/components/CitySelector): 城市选择器组件（结构已创建，待完善）
-   `PriceDisplay` (src/components/PriceDisplay): 价格展示组件（结构已创建，待完善）

---

## 项目更新日志 (2026-02-04)

### 个人中心 (User) 与 订单 (Order) 模块升级

1.  **功能更新**：
    -   **新增“订单”选项卡**：在个人中心集成订单管理，支持按“全部、待入住、待评价、历史订单、退款/售后”五大维度筛选。
    -   **整合入口**：将常用入住人、个人信息与订单管理统一在四个选项卡中。

2.  **视觉重构**：
    -   重写 `pages/user/index.scss`，引入高端深蓝渐变色调。
    -   优化 VIP 会员标识及用户头像展示。
    -   订单列表采用全新的卡片样式，包含“联系酒店”与“再次预订”操作按钮。

### 后端架构迁移与云数据库集成

1.  **Node.js 后端上线**：
    -   新建 `YiSuServer_Node` 目录，采用 Express.js 框架重构后端逻辑。
    -   实现了用户鉴权、酒店管理及房型查询等核心 API。

2.  **Supabase 集成**：
    -   全面对接 Supabase (PostgreSQL) 云数据库，弃用本地 MySQL。
    -   使用 `@supabase/supabase-js` SDK 进行数据交互，大幅提升开发效率。
    -   提供了完善的 [接入指南](./YiSuServer_Node/supabase_guide.md)。
