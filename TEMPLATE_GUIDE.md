# 模板复用说明

本仓库可作为个人学术主页模板继续复用，适合以下两类场景：

1. 作为个人主页源码仓库，持续维护并部署到 GitHub Pages
2. 作为模板仓库，为新的主页项目快速生成初始版本

## 使用前需要知道

- GitHub Pages 发布的是站点内容，不是仓库管理界面
- 对于静态站点，浏览器仍然可以访问加载到前端的 `HTML`、`CSS`、`JavaScript`、图片和 PDF 等资源
- 如果仓库是公开的，这些资源在 GitHub 仓库中同样可见
- 如果希望隐藏源码管理入口，可使用私有仓库，或采用外部托管 / 构建产物分离方案

## 作为 GitHub Pages 站点使用

1. 将当前代码推送到目标仓库
2. 打开仓库 `Settings -> Pages`
3. 在 `Build and deployment` 中选择 `GitHub Actions`
4. 保持默认分支为 `main`
5. 后续每次推送都会自动触发部署

示例命令：

```bash
git init
git add .
git commit -m "Initial academic homepage"
git branch -M main
git remote add origin https://github.com/<your-name>/<repo-name>.git
git push -u origin main
```

## 作为模板仓库使用

1. 打开仓库 `Settings`
2. 勾选 `Template repository`
3. 返回仓库首页，点击 `Use this template`
4. 创建新的仓库并选择名称、可见性和描述

## 模板生成后建议优先替换

- `index.html` 中的姓名、单位、邮箱、论文、项目和教育信息
- `assets/images/` 中的头像、背景图和其他静态图片
- `assets/papers/` 中的论文附件或 PDF 链接
- `script.js` 中的打字文本与座右铭内容
- `styles.css` 中的颜色、字体和视觉细节

## 对外分享模板前的检查项

1. 删除或替换个人照片、简历、论文附件、私人邮箱、详细地址等敏感内容
2. 将示例文案替换为可复用的占位内容
3. 检查图片、PDF 和论文附件是否允许公开分发
4. 根据实际分享方式确认 [`LICENSE`](LICENSE) 是否合适
