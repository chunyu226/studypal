## Why

当前站点的 `<title>` 和 `<meta description>` 过于简单，缺乏 Open Graph / Twitter Card 社交标签，导致搜索引擎排名不佳、社交分享预览为空白。同时缺少 `robots.txt` 影响爬虫收录策略。站点内容已基本完整，正是进行 SEO 基础设施优化的最佳时机。

## What Changes

- 增强 `index.html` 中的 meta 标签：扩充 `title` 和 `description`，添加 Open Graph（`og:*`）和 Twitter Card 标签
- 对现有组件进行语义化 HTML 审查和修复：确保使用正确的 landmark 元素（`<main>`、`<nav>`、`<section>`、`<article>`），heading 层级正确
- 新增 `public/robots.txt`，允许所有爬虫索引

## Capabilities

### New Capabilities

- `seo-foundation`: SEO 基础设施，包含增强型 meta 标签（含社交分享预览）、语义化 HTML landmark 结构、robots.txt 爬虫策略

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **修改文件**: `index.html` — 增强 title/description、新增 OG + Twitter Card meta 标签
- **新增文件**: `public/robots.txt` — 爬虫索引策略
- **可能修改**: `src/App.tsx` — 添加 `<main>` landmark 包裹主内容区（语义化审查结果）

## Out of Scope

- sitemap.xml 生成
- Google Analytics / 第三方 SEO 工具集成
- JSON-LD 结构化数据
- favicon 设计
