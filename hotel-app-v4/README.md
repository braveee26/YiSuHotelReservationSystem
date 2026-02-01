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
hotel-app-v4/
├── config/             # Taro 构建配置
├── src/
│   ├── app.jsx         # 应用入口
│   ├── app.config.js   # 路由配置
│   ├── assets/         # 静态资源
│   ├── components/     # 公共组件
│   ├── pages/          # 页面
│   ├── services/       # API 请求
│   ├── store/          # 状态管理
│   └── utils/          # 工具函数
└── dist/               # 构建产物
```

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
    - 路径：`src/assets/tab/`
    - 命名规范：`tab-{name}.png` (未选中) 和 `tab-{name}-active.png` (选中)。
    - 在 `src/components/TabBar/index.jsx` 中直接 `import` 使用。

2.  **通用 UI 图标**：
    - 使用 **@taroify/icons** 组件库。
    - 引入方式：`import { IconName } from '@taroify/icons'`
    - 注意：已移除 babel-plugin-import 配置，直接使用具名导入即可支持 Tree-shaking。

### 3. 可复用组件

目前项目中封装了以下主要可复用组件：

#### HotelCard (酒店卡片)

展示酒店基本信息的通用卡片组件，用于首页推荐、收藏列表、酒店列表等。

- **路径**：`src/components/HotelCard.jsx`
- **使用示例**：

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

#### TabBar (自定义底部导航)

替代原生 TabBar，支持更灵活的样式定制和图标控制。

- **路径**：`src/components/TabBar/index.jsx`
- **使用示例**：

```jsx
import TabBar from "@/components/TabBar";

// current 为当前 tab 的索引 (0-4)
<TabBar current={0} />;
```

#### 其他组件 (开发中)

- `CitySelector` (src/components/CitySelector): 城市选择器组件（结构已创建，待完善）
- `PriceDisplay` (src/components/PriceDisplay): 价格展示组件（结构已创建，待完善）
