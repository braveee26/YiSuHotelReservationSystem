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

## 可用脚本

```bash
npm run dev:h5      # H5 开发模式
npm run dev:weapp   # 微信小程序开发模式
npm run build:h5    # H5 生产构建
npm run build:weapp # 微信小程序生产构建
```
