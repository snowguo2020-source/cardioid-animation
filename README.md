# 笛卡尔心形曲线动画 - Cardioid Animation

一个美丽的交互式笛卡尔心形曲线可视化动画网页。

## 📐 数学原理

笛卡尔心形曲线（Cardioid）的参数方程：

```
x = a cos(t) (1 + cos(t))
y = a sin(t) (1 + cos(t))
```

其中：
- `t` ∈ [0, 2π]
- `a` 是决定心形大小的常数

## ✨ 特性

- 🎯 实时动画展示心形曲线的绘制过程
- 🎨 黑色背景配金色光晕效果
- 📊 带坐标轴显示
- 💫 发光粒子追踪运动轨迹
- 🎛️ 可调节心形大小（a 参数）
- ⚡ 可调节动画速度
- ⏯️ 暂停/继续控制
- 🔄 重置功能
- 📱 响应式设计，支持移动端

## 🚀 本地运行

直接打开 `index.html` 文件即可在浏览器中查看。

或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve
```

然后在浏览器中访问 `http://localhost:8000`

## 🌐 部署到 Vercel

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 在项目目录中运行：
```bash
vercel
```

3. 按照提示完成部署

### 方法二：通过 GitHub + Vercel

1. 将代码推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit: Cardioid animation"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. 访问 [Vercel](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

## 📁 项目结构

```
cardioid-animation/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 动画逻辑
├── vercel.json         # Vercel 部署配置
└── README.md           # 项目说明
```

## 🎮 使用说明

- **心形大小滑块**：调整参数 `a` 的值（30-200），改变心形的大小
- **动画速度滑块**：调整动画播放速度（0.1x-3x）
- **重置按钮**：重新开始动画
- **暂停按钮**：暂停/继续动画播放

## 🎨 视觉效果

- 黑色背景（#000）
- 金色线条（#ffd700）
- 柔和光晕效果
- 发光粒子动画
- 半透明轨迹残影

## 💻 技术栈

- 纯 HTML5
- CSS3（带动画效果）
- 原生 JavaScript
- Canvas API

## 📄 许可证

MIT License

## 👨‍💻 作者

Created with ❤️ for mathematical visualization
