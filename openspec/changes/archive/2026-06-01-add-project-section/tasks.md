## 1. 创建 ProjectShowcase 组件

- [x] 1.1 定义 `Project` TypeScript 接口，创建 4 个项目的静态数据数组（包含名称、简介、截图路径、GitHub URL），使用渐变色占位图
- [x] 1.2 创建 `src/components/ProjectShowcase.tsx`，实现响应式卡片网格布局（`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`）
- [x] 1.3 实现单张项目卡片渲染：截图（`loading="lazy"`）、名称、简介、GitHub 链接（新标签页打开），卡片悬浮时 `hover:scale-[1.03]` + `hover:shadow-xl` 微特效（`transition-all duration-300`）
- [x] 1.4 添加图片加载失败处理：`onError` 时展示纯色占位块，不显示破损图标

## 2. 集成到 App 并修改 Hero CTA

- [x] 2.1 修改 `src/App.tsx`，用 `ProjectShowcase` 替换 `#projects` 的 PlaceholderSection
- [x] 2.2 修改 `src/components/Hero.tsx`，CTA 按钮的 `href` 从 `/my-website/projects` 改为 `#projects`
