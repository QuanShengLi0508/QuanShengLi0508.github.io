# 个人学术主页

一个基于 `HTML`、`CSS` 和 `JavaScript` 的静态个人学术主页，用于展示个人简介、研究方向、论文成果、项目经历、获奖信息、教育背景和联系方式。仓库已内置 GitHub Pages 自动部署配置，可直接作为个人主页站点或模板仓库使用。

## 主要特性

- 纯静态架构，无需后端即可部署
- 桌面端与移动端响应式适配
- 首页包含头像、动态标题、研究方向打字效果和座右铭轮播
- 支持展示研究方向、论文、项目、获奖和教育经历
- 图片与论文附件独立存放，便于维护和替换
- 已配置 GitHub Pages 工作流，推送后可自动部署

## 项目结构

```text
.
├── .dockerignore                       # Docker 构建忽略项
├── .github/workflows/deploy-pages.yml  # GitHub Pages 自动部署
├── assets/
│   ├── images/                         # 头像、背景图及其他图片资源
│   └── papers/                         # 论文 PDF 等附件
├── docker-compose.yml                  # Docker Compose 启动配置
├── Dockerfile                          # Docker 镜像定义
├── index.html                          # 页面结构与内容
├── nginx.conf                          # Nginx 静态站点配置
├── styles.css                          # 视觉样式与响应式布局
├── script.js                           # 交互逻辑与动画效果
├── TEMPLATE_GUIDE.md                   # 模板复用说明
├── LICENSE                             # 授权说明
└── README.md                           # 项目说明
```

## 本地预览

### 直接打开

这是一个纯静态站点，直接在浏览器中打开 `index.html` 即可预览。

### 启动本地静态服务器

如果需要更接近实际部署环境的预览方式，可在项目根目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

### 使用 Docker

项目已提供 `Dockerfile`、`nginx.conf` 和 `docker-compose.yml`，可直接容器化运行。

构建镜像：

```bash
docker build -t academic-homepage .
```

运行容器：

```bash
docker run --rm -p 8080:80 academic-homepage
```

然后访问：

```text
http://localhost:8080
```

如果你更习惯使用 Compose：

```bash
docker compose up -d --build
```

停止服务：

```bash
docker compose down
```

## 内容维护

### 个人信息与页面内容

编辑 `index.html` 可更新以下内容：

- 姓名、单位、邮箱与社交链接
- 个人简介与研究方向
- 论文、项目、获奖与教育经历
- 联系方式与页脚信息

### 图片与附件

- 头像和其他图片资源位于 `assets/images/`
- 首页头像默认文件为 `assets/images/avatar.jpg`
- 论文 PDF 位于 `assets/papers/`

替换头像时，可直接覆盖 `assets/images/avatar.jpg`，或在 `index.html` 中修改对应路径。

### 样式与交互

- 编辑 `styles.css` 可调整颜色、字体、卡片样式、动画与响应式布局
- 编辑 `script.js` 可修改打字机内容、滚动交互、导航行为和数字统计动画

## 部署到 GitHub Pages

仓库已包含 GitHub Pages 工作流文件 `.github/workflows/deploy-pages.yml`。

部署步骤：

1. 将代码推送到 GitHub 仓库
2. 打开 `Settings -> Pages`
3. 在 `Build and deployment` 中选择 `GitHub Actions`
4. 推送到 `main` 分支后，GitHub 会自动构建并部署

## 模板复用

如果你希望把这个项目作为模板继续复用：

1. 打开仓库 `Settings`
2. 勾选 `Template repository`
3. 返回仓库首页
4. 点击 `Use this template`

详细说明见 [`TEMPLATE_GUIDE.md`](TEMPLATE_GUIDE.md)。

## 版权与说明

- 这是一个静态网站，浏览器可直接访问加载到前端的 `HTML`、`CSS`、`JavaScript`、图片和 PDF 资源
- 如果仓库为公开状态，仓库中的图片和附件也会在 GitHub 上可见
- 具体授权方式请以 [`LICENSE`](LICENSE) 为准
