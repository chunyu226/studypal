## 1. 创建 AboutSection 组件

- [x] 1.1 创建 `public/images/avatar-placeholder.svg` 人像轮廓占位 SVG
- [x] 1.2 创建 `src/components/AboutSection.tsx`，实现左右分栏网格布局（`grid-cols-1 md:grid-cols-2`），左侧圆形照片（`rounded-full` + 边框），右侧三段简介文字
- [x] 1.3 实现品牌标签"赋范空间"——胶囊状样式（`rounded-full bg-indigo-100 dark:bg-slate-700`），放置在右侧文字下方
- [x] 1.4 照片添加 `loading="lazy"` + `onError` 占位处理（圆形人像轮廓色块）

## 2. 集成到 App

- [x] 2.1 修改 `src/App.tsx`，在 ProjectShowcase 与 PlaceholderSection#contact 之间插入 AboutSection
