## 1. Meta 标签增强

- [x] 1.1 修改 `index.html`，增强 `<title>` 和 `<meta description>` 内容（添加身份关键词，控制字符长度）
- [x] 1.2 添加 Open Graph 标签（`og:title`、`og:description`、`og:image`、`og:url`、`og:type`）
- [x] 1.3 添加 Twitter Card 标签（`twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`）

## 2. 语义化 HTML + robots.txt

- [x] 2.1 审查现有组件的语义化 HTML 元素使用情况，修改 `src/App.tsx` 添加 `<main>` landmark 包裹内容区（Hero + ProjectShowcase + AboutSection），Navbar 保留在 `<main>` 之外
- [x] 2.2 创建 `public/robots.txt`（`User-agent: *` + `Allow: /`）
