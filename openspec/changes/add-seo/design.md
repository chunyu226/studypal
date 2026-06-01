## Context

当前 `index.html` 仅有基础 `<title>` 和 `<meta description>`，缺少社交分享预览标签。站点各组件已使用部分语义化元素（`<nav>`、`<section>`、`<article>`），但缺少 `<main>` landmark。`robots.txt` 不存在。

## Goals / Non-Goals

**Goals:**
- 增强 index.html：扩充 title/description，添加 Open Graph 和 Twitter Card 标签
- 审查并修复语义化 HTML：添加 `<main>` 包裹主内容，确保 heading 层级正确
- 创建 robots.txt 允许爬虫索引

**Non-Goals:**
- sitemap.xml
- JSON-LD 结构化数据
- Google Analytics
- favicon

## Decisions

### 1. Meta 标签策略：OG + Twitter Card 双协议

Open Graph（Facebook/LinkedIn 等）和 Twitter Card 两套标签同时提供，覆盖主流社交平台。Twitter 在未找到自有标签时会回退到 OG 标签，两者互补。

**具体标签：**
```
title: "张老师的个人网站 - 全栈开发者"
description: 更丰富的描述文字（约 150 字）
og:title, og:description, og:image, og:url, og:type
twitter:card, twitter:title, twitter:description, twitter:image
```

OG 图片使用 SVG 转 PNG 占位（或直接引用 avatar 占位图），后续可替换为专门设计的社交预览图。

### 2. 语义化 HTML：App.tsx 添加 `<main>` landmark

当前 App.tsx 使用 `<>...</>` Fragment 包裹所有 section。添加 `<main>` 包裹 Hero + ProjectShowcase + AboutSection，将 Navbar 保留在外（Navbar 自身已是 `<nav>` landmark）。

审查结论：
- `<nav>` ✅ — Navbar 已使用
- `<section>` ✅ — Hero、ProjectShowcase、AboutSection 均使用
- `<article>` ✅ — ProjectShowcase 卡片使用
- `<main>` ❌ 缺失 — 需添加
- heading 层级 ✅ — h1(Hero) → h2(Projects/About) → h3(卡片标题)

### 3. robots.txt：全开放策略

```
User-agent: *
Allow: /
```

个人品牌站无敏感路径需屏蔽，全开放最大化收录。预留 Sitemap 字段指向 `/my-website/sitemap.xml`（虽当前无 sitemap，但不影响爬虫行为）。

### 4. Base Path 处理

所有绝对路径需加 `/my-website/` 前缀（GitHub Pages 部署要求）。OG image 路径使用完整 URL 或相对路径时注意 base path。

## Risks / Trade-offs

- **OG 图片暂无专门设计** → 使用 avatar 占位图，社交预览效果有限但不影响爬虫收录
- **robots.txt 全开放** → 无风险，站点无敏感内容
