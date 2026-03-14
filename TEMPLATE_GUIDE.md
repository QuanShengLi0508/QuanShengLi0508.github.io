# 模板仓库使用说明

## 目标

这个仓库适合以下工作流：

1. 源码仓库保持 `private`
2. 网站通过 GitHub Pages 自动部署
3. 仓库本身可被标记为 `Template repository`
4. 后续通过模板快速创建新的个人主页仓库

## 先说清楚的限制

- GitHub Pages 发布的是站点，不是仓库源码。
- 仓库设为 `private` 后，可以隐藏提交历史和源码管理入口。
- 但静态站点发到浏览器的资源仍然可以被查看，包括 `HTML`、`CSS`、`JavaScript`、图片、PDF。
- 如果你要做到“页面可看，但任何前端源文件都不可见”，静态站点做不到，需要后端渲染或受控接口方案。

## 作为私有源码仓库发布

1. 在 GitHub 创建一个新的 `private` 仓库。
2. 把当前目录推送到该仓库。
3. 进入 `Settings -> Pages`。
4. 将 `Source` 设置为 `GitHub Actions`。
5. 保持默认分支为 `main`，后续每次 push 都会触发部署。

示例命令：

```bash
git init
git add .
git commit -m "Initial private academic homepage"
git branch -M main
git remote add origin https://github.com/<your-name>/<repo-name>.git
git push -u origin main
```

## 作为模板仓库使用

1. 打开你在 GitHub 上的仓库页面。
2. 进入 `Settings`。
3. 勾选 `Template repository`。
4. 返回仓库首页，点击 `Use this template`。
5. 创建新仓库时选择名称和可见性。

建议做法：

- 如果这个模板只给自己用，模板仓库保持 `private`。
- 如果这个模板要给他人复用，先删除个人隐私内容，再决定是否改成开源许可证。

## 模板生成后需要替换的内容

- `index.html` 中的姓名、单位、邮箱、项目和论文信息
- 头像、背景图、PDF 等静态资源
- `script.js` 中的打字动画关键词
- `styles.css` 中的品牌色和视觉细节

## 当前部署文件

- `.github/workflows/deploy-pages.yml`：推送到 `main` 时自动部署
- `.nojekyll`：关闭 Jekyll 处理，直接发布静态资源
- `LICENSE`：当前默认是闭源声明

## 如果要公开分享模板

请至少做这几件事：

1. 删除个人照片、PDF、简历、具体地址、私人邮箱等敏感内容
2. 把站点文案替换成占位内容
3. 将 `LICENSE` 改为你希望公开授权的许可证
4. 重新检查图片和论文附件是否允许二次分发
