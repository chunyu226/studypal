## Context

当前页面结构为 Hero → ProjectShowcase → PlaceholderSection#contact。在项目展示与联系我之间插入"关于我"区域，形成流畅的个人品牌叙事。

## Goals / Non-Goals

**Goals:**
- 左右分栏布局：左侧照片，右侧三段简介文字
- 底部品牌标签"赋范空间"
- 照片使用 lazy loading
- 支持亮/暗模式

**Non-Goals:**
- 联系我表单

## Decisions

### 1. 布局方案：CSS Grid 左右分栏

桌面端使用 `grid grid-cols-1 md:grid-cols-2`，左侧照片区 + 右侧文字区。移动端照片在上、文字在下。照片区使用 `flex items-center justify-center` 居中。

### 2. 照片占位：SVG 占位图

由于尚无真实照片，使用 `public/images/avatar-placeholder.svg` 作为占位图——圆形裁剪的灰色人像轮廓 SVG。后续替换为真实照片 URL 即可。

### 3. 照片样式：圆形裁剪 + 边框

使用 `rounded-full` 圆形裁剪，配合 `border-4 border-indigo-200 dark:border-slate-600` 边框，与粒子风的科技感协调。

### 4. 简介文字：静态三段结构

三段文字直接写在组件 JSX 中，不抽数据层——这是唯一且固定的内容，不需要数组驱动。每段包裹在 `<p>` 标签中。

### 5. 品牌标签：胶囊状 badge

"赋范空间"使用 `rounded-full bg-indigo-100 dark:bg-slate-700` 胶囊样式，居中放置在文字下方，与项目卡片风格统一。

### 6. Section ID：about

使用 `id="about"` 作为锚点 ID，未来可通过导航栏扩展链接。

## Risks / Trade-offs

- **占位图不具个人辨识度** → 使用清晰的人像轮廓 SVG + 文字提示，后续替换零代码改动
- **文字内容需后续调整** → 三段文字为展示性占位内容，直接写在 JSX 中便于快速修改
