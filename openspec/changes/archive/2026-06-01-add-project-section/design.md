## Context

当前 `#projects` 为 PlaceholderSection 占位组件。本次将其替换为真实项目展示区，同时修改 Hero 的 CTA 按钮目标锚点。

## Goals / Non-Goals

**Goals:**
- 项目展示区采用卡片式网格布局，至少展示 4 个项目
- 每张卡片包含：项目截图、名称、简介、GitHub 链接
- 鼠标悬浮时卡片微缩放 + 阴影增强
- 所有项目截图使用 lazy loading
- Hero CTA 按钮改为锚点 #projects

**Non-Goals:**
- 项目详情页
- 项目搜索/筛选

## Decisions

### 1. 数据驱动：静态数据数组 + TypeScript 类型

项目数据定义为 `Project[]` 静态数组，存储项目的名称、简介、截图路径、GitHub URL。

```
interface Project {
  name: string
  insight: string
  image: string
  githubUrl: string
}
```

不引入 CMS 或 API 层——4 个项目只需静态数据。

### 2. 卡片布局：CSS Grid 自适应

使用 `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 实现响应式卡片布局。单列（mobile）→ 双列（tablet）→ 三列（desktop）。

### 3. 悬浮微特效：Tailwind hover: + transition

悬浮时 `hover:scale-[1.03]` 微放大 + `hover:shadow-xl` 阴影加深，配合 `transition-all duration-300` 平滑过渡。不使用外部动画库。

### 4. 图片懒加载：原生 loading="lazy"

所有 `<img>` 元素使用 `loading="lazy"` 属性，浏览器原生支持，零 JS 开销。

### 5. 图片占位：placeholder SVG

项目截图存放在 `public/images/projects/` 下。由于目前没有真实项目截图，使用四个不同色调的渐变色占位图（SVG data URI），后续可直接替换为真实 PNG/WebP 文件。

### 6. Hero CTA 修改：href 改为 #projects

Hero.tsx 中 `<a href="/my-website/projects">` 改为 `<a href="#projects">`，利用浏览器原生锚点行为。Navbar 的 `scrollIntoView` 逻辑已覆盖该路径。

## Risks / Trade-offs

- **占位图缺乏真实感** → 使用清晰的色块 + 项目名缩写，提示后续替换；不影响布局和交互验证
- **GitHub 链接失效** → 仅影响用户点击跳转，不触发页面报错（标准 `<a>` 行为）
- **卡片过多时网格拉伸** → 当前 4 个项目，grid-cols-3 最后一行仅有 1 张卡片，无 layout shift
