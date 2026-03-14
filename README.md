# 个人学术主页静态站点

这个仓库已经整理成适合下面两种用途的基础版本：

1. 私有仓库保存源码，通过 GitHub Pages 发布一个可访问的网站。
2. 在 GitHub 上打开 `Template repository` 后，作为新仓库模板继续复用。

## 重要边界

- 私有仓库不等于私密网站。仓库可以是 private，但发布后的 GitHub Pages 站点本身仍然是可访问的。
- 这是纯前端静态站点。浏览器拿到的 `HTML`、`CSS`、`JavaScript`、图片和 PDF 资源都可以被查看或下载，无法做到“访客只能看页面但完全看不到前端代码”。
- 你能隐藏的是 Git 仓库源码和提交历史，不能隐藏已经发布到浏览器里的静态资源。

## 当前已经加好的内容

- `GitHub Actions` 版本的 Pages 部署工作流，适合私有仓库发布。
- `All Rights Reserved` 闭源许可证说明。
- 模板仓库使用文档。
- 头像图片缺失时的前端兜底，不会因为本地删掉图片直接出现坏链。

## 文件结构

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages 自动部署
├── .nojekyll                           # 静态资源直出
├── LICENSE                             # 闭源声明
├── TEMPLATE_GUIDE.md                   # 模板仓库使用说明
├── index.html                          # 主页面
├── styles.css                          # 样式
├── script.js                           # 交互脚本
└── README.md                           # 仓库说明
```

## 私有仓库部署

1. 在 GitHub 新建一个 `private` 仓库。
2. 把当前代码推送到新仓库。
3. 进入 `Settings -> Pages`。
4. 在 `Build and deployment` 中把 `Source` 设为 `GitHub Actions`。
5. 推送到 `main` 分支后，工作流会自动部署。

如果你的 GitHub 套餐不支持从私有仓库使用 GitHub Pages，需要改用以下任一方案：

- 使用 Cloudflare Pages / Vercel，从私有 GitHub 仓库自动部署。
- 保留源码仓库为 private，再单独准备一个只放构建产物的 public 发布仓库。

## 模板仓库使用

详细步骤见 [`TEMPLATE_GUIDE.md`](TEMPLATE_GUIDE.md)。

简版流程：

1. 把当前仓库推送到你准备作为模板的仓库。
2. 进入 GitHub 仓库 `Settings`。
3. 打开 `Template repository`。
4. 点击 `Use this template` 创建新的仓库。
5. 新仓库可以继续选择 `private` 或 `public`。

## 站点内容修改入口

- 个人信息、论文、项目、教育经历：修改 `index.html`
- 配色、布局、动画：修改 `styles.css`
- 打字效果、滚动交互、动画逻辑：修改 `script.js`

## 许可证

当前仓库默认采用闭源模式：`All Rights Reserved`。

如果你之后要把模板公开给别人复用，再把 `LICENSE` 改成 MIT、Apache-2.0 或你需要的开源许可证。
