<!-- ========================================= -->

<!--         易宿酒店预订系统 README            -->

<!-- ========================================= -->

`<a id="readme-top"></a>`

<!-- Badges -->

<p align="center">
  <img src="https://img.shields.io/badge/Taro-4.1.11-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4Ij5UPC90ZXh0Pjwvc3ZnPg==" alt="Taro" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Supabase-Cloud_DB-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<!-- Logo + Title -->

<br />
<div align="center">
  <!-- TODO: 替换为项目 Logo 图片链接 -->
  <h1>🏨 易宿酒店预订系统</h1>
  <h3>YiSu Hotel Reservation System</h3>
  <p>基于 Taro 跨端框架的全栈酒店预订解决方案，一套代码同时运行于 H5、微信小程序与 Android。</p>
  <p>
    <a href="#getting-started">快速开始</a>
    ·
    <a href="#usage">使用方式</a>
    ·
    <a href="#project-structure">项目结构</a>
    ·
    <a href="#roadmap">路线图</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->

<details>
  <summary>📑 目录 / Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project（项目简介）</a></li>
    <li><a href="#built-with">Built With（技术栈）</a></li>
    <li>
      <a href="#getting-started">Getting Started（快速开始）</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites（前置要求）</a></li>
        <li><a href="#frontend-installation">前端安装</a></li>
        <li><a href="#backend-installation">后端安装</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage（使用方式）</a></li>
    <li><a href="#project-structure">Project Structure（项目结构）</a></li>
    <li><a href="#roadmap">Roadmap（路线图）</a></li>
    <li><a href="#contributing">Contributing（贡献指南）</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project（项目简介）

**易宿酒店预订系统** 是一个面向 C 端用户的全功能酒店在线预订平台。用户可以通过城市搜索、标签筛选、星级过滤等方式快速找到心仪的酒店，查看房型详情并完成在线预订。系统同时支持收藏、点评、消息通知和订单管理等常用功能。

项目前端基于 **Taro 4 + React 18** 构建，实现了一套代码多端运行（H5 网页版、微信小程序、Android App）。UI 层采用 Taroify 组件库并辅以高度定制的视觉设计，包含玻璃拟态卡片、渐变背景、微动效等现代设计语言，打造精致的用户体验。

后端采用 **Node.js + Express 5** 架构，数据层接入 **Supabase** 云数据库（PostgreSQL），并利用 Supabase Storage 和 RLS (行级安全策略) 实现图片管理和细粒度的数据权限控制，开箱即用、无需自建数据库。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Built With（技术栈）

### 前端 (Frontend)

| 技术                                              | 版本    | 说明                                      |
| ------------------------------------------------- | ------- | ----------------------------------------- |
| [Taro](https://taro-docs.jd.com/)                 | 4.1.11  | 跨端开发框架（H5 / 微信小程序 / Android） |
| [React](https://react.dev/)                       | ^18.0.0 | UI 构建库                                 |
| [Taroify](https://taroify.github.io/taroify.com/) | ^0.9.0  | UI 组件库（有赞 Vant Taro 版）            |
| [Zustand](https://zustand-demo.pmnd.rs/)          | ^4.5.0  | 轻量级状态管理                            |
| SCSS                                              | -       | 样式预处理器                              |
| Webpack 5                                         | ^5.91.0 | 构建工具                                  |
| [Capacitor](https://capacitorjs.com/)             | ^8.0.2  | Web → Android 原生壳                      |

### 后端 (Backend)

| 技术                                             | 版本    | 说明              |
| ------------------------------------------------ | ------- | ----------------- |
| [Node.js](https://nodejs.org/)                   | 16+     | JavaScript 运行时 |
| [Express](https://expressjs.com/)                | ^5.2.1  | Web 框架          |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^3.0.3  | 密码加密          |
| dotenv                                           | ^17.2.3 | 环境变量管理      |
| cors                                             | ^2.8.6  | 跨域请求处理      |

### 数据库 & 存储 (Database & Storage)

| 技术                              | 说明                                         |
| --------------------------------- | -------------------------------------------- |
| [Supabase](https://supabase.com/) | 云端 PostgreSQL 数据库 + 对象存储 + RLS 权限 |
| Supabase Storage                  | 酒店 / 房型图片存储（Bucket:`hotel-assets`） |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started（快速开始）

`<a id="getting-started"></a>`

### Prerequisites（前置要求）

`<a id="prerequisites"></a>`

- **Node.js** 16+ & **npm** 8+
- **微信开发者工具**（如需小程序调试）：[下载链接](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- **Android Studio**（如需 Android 端调试）：需要 API 34+ 的模拟器镜像
- **Supabase 账号**：[注册地址](https://supabase.com/)

```bash
# 检查 Node.js 版本
node -v   # >= 16.x
npm -v    # >= 8.x
```

---

### 前端安装 (Frontend)

`<a id="frontend-installation"></a>`

```bash
# 1. 进入前端目录
cd hotel-app-v4

# 2. 安装依赖
npm install

# 3. 启动 H5 开发模式
npm run dev:h5
```

启动后访问 **http://localhost:10086/** 即可预览。

> [!IMPORTANT]
> 前端需要后端服务同时运行才能正常获取数据，请先完成后端安装。

---

### 后端安装 (Backend)

`<a id="backend-installation"></a>`

```bash
# 1. 进入后端目录
cd YiSuServer_Node

# 2. 安装依赖
npm install

# 3. 创建环境变量文件
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Supabase 凭据：

```env
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_KEY=your-anon-key
PORT=3000
```

```bash
# 4. 启动后端服务
node server.js
```

服务启动后访问 **http://localhost:3000/api** 可看到 API 状态信息。

> [!CAUTION]
> 绝对不要在前端代码中硬编码 `service_role` Key！仅在后端使用 `anon` Key（受 RLS 保护），`service_role` Key 仅限后端系统级操作。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Usage（使用方式）

`<a id="usage"></a>`

### 主要 API 端点

| 方法   | 端点                     | 说明                                |
| ------ | ------------------------ | ----------------------------------- |
| `GET`  | `/api/hotels`            | 获取所有酒店列表                    |
| `GET`  | `/api/hotels/:id`        | 获取特定酒店详情                    |
| `GET`  | `/api/hotels/attributes` | 获取酒店筛选标签                    |
| `POST` | `/api/users/register`    | 用户注册（默认 `customer` 角色）    |
| `POST` | `/api/users/login`       | 用户登录（APP 端仅允许 `customer`） |
| `PUT`  | `/api/users/profile/:id` | 更新用户资料                        |
| `GET`  | `/api/rooms/hotel/:id`   | 获取指定酒店的房型列表              |

### 多端运行方式

```bash
# H5 网页版
npm run dev:h5          # 开发模式 → http://localhost:10086/

# 微信小程序
npm run dev:weapp       # 构建产物 → dist/
# 然后在微信开发者工具中导入 dist/ 目录

# Android App
npm run build:h5        # 构建 Web 资源
npx cap sync android    # 同步到 Android 工程
npx cap open android    # 打开 Android Studio → Run
```

> [!WARNING]
> Android 模拟器需使用 **API 34+** 镜像，低版本 WebView 内核不支持新版 JS 语法会导致白屏。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Structure（项目结构）

`<a id="project-structure"></a>`

```
YiSuHotelReservationSystem/
├── hotel-app-v4/                # 前端跨端项目 (Taro + React)
│   ├── src/
│   │   ├── app.jsx              # 应用入口
│   │   ├── app.config.js        # 路由与页面配置
│   │   ├── app.scss             # 全局样式
│   │   ├── config.js            # API 地址配置（多端适配）
│   │   ├── assets/              # 静态资源（Tab 图标等）
│   │   ├── components/          # 可复用组件
│   │   │   ├── CustomTabBar/    #   自定义底部导航栏
│   │   │   ├── PageFadeIn/      #   页面进场动画
│   │   │   ├── HotelCard.jsx    #   酒店卡片
│   │   │   ├── CitySelector/    #   城市选择器
│   │   │   └── PriceDisplay/    #   价格展示
│   │   ├── pages/               # 页面目录
│   │   │   ├── home/            #   首页
│   │   │   ├── user/            #   个人中心
│   │   │   ├── order/           #   订单
│   │   │   ├── auth/            #   登录 / 注册
│   │   │   ├── hotel/           #   酒店列表 / 详情 / 预订（分包）
│   │   │   ├── sub-main/        #   收藏 / 消息 / 点评（分包）
│   │   │   └── sub-user/        #   常用入住人 / 设置（分包）
│   │   ├── services/            # API 请求封装
│   │   ├── store/               # Zustand 全局状态
│   │   └── utils/               # 工具函数
│   ├── android/                 # Android 原生工程 (Capacitor)
│   ├── config/                  # Taro 构建配置
│   ├── package.json
│   └── capacitor.config.json
│
├── YiSuServer_Node/             # 后端项目 (Node.js + Express)
│   ├── server.js                # 入口文件
│   ├── routes/
│   │   ├── hotels.js            #   酒店相关路由
│   │   ├── rooms.js             #   房型相关路由
│   │   └── users.js             #   用户相关路由
│   ├── config/                  # Supabase 客户端配置
│   ├── .env.example             # 环境变量模板
│   ├── package.json
│   └── supabase_guide.md        # Supabase 接入指南
│
└── YiSuSystem/                  # 旧版 Java 后端脚手架（备用）
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap（路线图）

`<a id="roadmap"></a>`

- [x] 用户注册 / 登录（角色区分：customer / merchant / admin）
- [x] 酒店列表展示 + 城市搜索 + 动态筛选标签
- [x] 酒店详情页 + 房型查询
- [x] 个人中心（订单管理、资料编辑、收藏、消息）
- [x] Android App 打包（Capacitor）
- [x] 图片上传 / 管理（Supabase Storage + RLS）
- [x] 页面进场动画 & 自定义 TabBar

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing（贡献指南）

`<a id="contributing"></a>`

本项目使用 **Supabase 共享云数据库** 进行多人协作，步骤如下：

1. **Fork** 本仓库并 Clone 到本地。
2. 创建你的 Feature 分支：`git checkout -b feature/AmazingFeature`
3. **获取数据库访问权限**：
   - 联系项目管理员，将你添加为 Supabase 项目成员（**Project Settings → Members → Invite**）。
   - 获取 `.env` 文件中的 `SUPABASE_URL` 和 `SUPABASE_KEY`，在本地创建 `.env` 文件。
4. 如有数据库结构变动，请将 SQL 变更脚本同步给团队成员。
5. Commit 你的更改：`git commit -m 'feat: add AmazingFeature'`
6. Push 到你的分支：`git push origin feature/AmazingFeature`
7. 提交 **Pull Request**。

> [!IMPORTANT]
> `.env` 文件包含敏感密钥，已在 `.gitignore` 中排除。请通过安全渠道传递密钥，切勿提交到仓库。

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

<!-- TODO: 创建 LICENSE 文件 -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

<!-- TODO: 填写联系方式 -->

- 项目负责人：TODO
- Email：TODO
- 项目链接：TODO

<p align="right">(<a href="#readme-top">back to top</a>)</p>
