# 个人学术主页

一个基于 `HTML + CSS + JavaScript` 的静态个人学术主页，适合展示个人简介、研究方向、论文、项目、获奖经历、教育背景和联系方式。仓库已经配置好 GitHub Pages 工作流，修改后可直接部署上线。

## 功能特点

- 纯静态站点，无需后端，部署简单
- 响应式布局，适配桌面端和移动端
- 首页包含头像、打字效果和滚动动画
- 支持展示研究方向、论文、项目、竞赛获奖和教育经历
- 论文 PDF、头像和图片资源可独立管理
- 已配置 GitHub Pages 自动部署流程

## 页面模块

- 首页 Hero
- About Me
- Research Interests
- Publications
- Projects
- Awards
- Education
- Contact

## 项目结构

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages 自动部署
├── assets/
│   ├── images/                         # 头像和图片资源
│   └── papers/                         # 论文 PDF
├── index.html                          # 页面结构与主要内容
├── styles.css                          # 页面样式
├── script.js                           # 动画与交互逻辑
├── TEMPLATE_GUIDE.md                   # 模板仓库使用说明
├── LICENSE                             # 授权说明
└── README.md                           # 项目说明
```

## 本地使用

### 方式一：直接打开

这是一个纯静态页面，直接双击 `index.html` 就可以在浏览器中预览。

### 方式二：本地启动静态服务器

如果你希望更接近实际部署环境，可以在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 自定义方法

### 1. 修改个人信息

编辑 `index.html`，可调整：

- 姓名、单位、邮箱
- 个人简介
- 研究方向
- 论文列表
- 项目经历
- 获奖与教育背景
- 社交链接和联系方式

### 2. 修改头像和图片

- 头像图片放在 `assets/images/`
- 当前首页头像文件为 `assets/images/avatar.jpg`
- 备用图片为 `assets/images/image.png`

如果要替换头像，直接用你的图片覆盖 `assets/images/avatar.jpg`，或者修改 `index.html` 中的图片路径。

### 3. 修改论文附件

- 论文 PDF 放在 `assets/papers/`
- 当前页面中的论文链接已经指向该目录

新增论文时：

1. 把 PDF 放到 `assets/papers/`
2. 在 `index.html` 的论文区域添加对应条目
3. 把链接改成对应文件路径

### 4. 修改样式

编辑 `styles.css`，可调整：

- 颜色
- 字体
- 间距
- 卡片样式
- 动画效果
- 响应式布局

### 5. 修改交互效果

编辑 `script.js`，可调整：

- 打字机文字内容
- 滚动触发动画
- 导航交互
- 数字统计动画

## 部署到 GitHub Pages

仓库已包含 GitHub Pages 工作流文件 `.github/workflows/deploy-pages.yml`。

### 部署步骤

1. 将代码推送到 GitHub 仓库
2. 打开仓库 `Settings -> Pages`
3. 在 `Build and deployment` 中选择 `GitHub Actions`
4. 推送到 `main` 分支后，GitHub 会自动构建并部署

## 作为模板仓库使用

如果你想把这个项目作为模板继续复用：

1. 打开仓库 `Settings`
2. 勾选 `Template repository`
3. 返回仓库首页
4. 点击 `Use this template`

更详细的模板说明见 [`TEMPLATE_GUIDE.md`](TEMPLATE_GUIDE.md)。

## 说明

- 这是静态网站，浏览器加载到的前端资源本身是可见的
- 如果仓库是公开的，仓库中的图片和 PDF 资源也会在 GitHub 上可见
- 授权方式请以 [`LICENSE`](LICENSE) 为准
