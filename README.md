# 个人学术主页 | Academic Homepage

一个基于 GitHub Pages 的现代个人学术主页模板，简洁优雅，响应式设计。

## ✨ 功能特点

- 🎨 **现代设计** — 精美的配色方案、玻璃态效果、微动画
- 📱 **响应式布局** — 完美支持桌面端、平板和手机
- ⚡ **纯静态** — 无需后端，部署方便
- 🔍 **SEO 友好** — 合理的 HTML 结构和 meta 标签
- 📝 **易于定制** — 清晰的代码结构，方便修改

## 📂 文件结构

```
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # 交互脚本
└── README.md       # 说明文档
```

## 🚀 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 仓库名填写 `你的用户名.github.io`（例如：`zhangsan.github.io`）
   - 如果不想用这个格式，也可以用其他名字（比如 `homepage`），但访问地址会变成 `你的用户名.github.io/homepage`
4. 设为 **Public**（公开）
5. 点击 **Create repository**

### 第二步：上传代码

**方法 A：通过 Git 命令行（推荐）**

```bash
# 进入项目目录
cd /path/to/your/project

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: academic homepage"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 推送到 GitHub
git push -u origin main
```

**方法 B：通过 GitHub 网页上传**

1. 在仓库页面点击 **Add file** → **Upload files**
2. 将 `index.html`、`styles.css`、`script.js` 拖拽上传
3. 点击 **Commit changes**

### 第三步：开启 GitHub Pages

1. 进入仓库 **Settings** → 左侧菜单 **Pages**
2. 在 **Source** 下选择 **Deploy from a branch**
3. 选择 **main** 分支和 **/ (root)** 目录
4. 点击 **Save**
5. 等待 1-2 分钟，页面将在 `https://你的用户名.github.io` 上线！

## ✏️ 如何自定义内容

### 修改个人信息

打开 `index.html`，搜索并替换以下占位文本：

| 占位文本 | 替换为 |
|---------|-------|
| `Your Name` | 你的姓名 |
| `Ph.D. Candidate` | 你的职称/身份 |
| `XX University` | 你的学校名 |
| `your-email@example.com` | 你的邮箱 |
| 各个 `XX` 占位符 | 你的实际信息 |

### 更换头像

1. 将你的照片命名为 `avatar.jpg` 放到项目根目录
2. 在 `index.html` 中找到 `hero-avatar` 部分
3. 取消注释 `<img>` 标签，删除 `avatar-placeholder` div

```html
<!-- 将这个 -->
<div class="avatar-placeholder">
  <i class="fas fa-user-graduate"></i>
</div>
<!-- 替换为 -->
<img src="avatar.jpg" alt="Your Name">
```

### 修改打字动画文字

打开 `script.js`，修改 `phrases` 数组：

```javascript
const phrases = [
  '你的研究方向1',
  '你的研究方向2',
  '你的研究方向3',
];
```

### 添加更多论文

在 `index.html` 的 `publications-list` 中复制一个 `pub-card` 并修改内容。

### 修改统计数据

在 `index.html` 中修改 `data-target` 属性的值：

```html
<div class="stat-number" data-target="你的论文数">0</div>
```

## 🎨 自定义样式

打开 `styles.css`，修改 `:root` 中的 CSS 变量来自定义配色：

```css
:root {
  --primary-500: #3370ff;    /* 主色调 */
  --accent-500: #8b5cf6;     /* 强调色 */
}
```

## 📄 License

MIT License — 自由使用和修改。
