## ADDED Requirements

### Requirement: HTML Meta 标签
页面 SHALL 在 `<head>` 中包含增强的 SEO meta 标签，包括精准的 title 和 description。

#### Scenario: title 标签
- **WHEN** 用户（或爬虫）打开页面
- **THEN** `<title>` 标签包含站点名称和站长身份关键词，字符数在 30-60 之间

#### Scenario: description 标签
- **WHEN** 用户（或爬虫）打开页面
- **THEN** `<meta name="description">` 标签包含站点内容的完整描述，字符数在 120-160 之间

---

### Requirement: 社交分享预览标签
页面 SHALL 包含 Open Graph 和 Twitter Card 标签，确保社交平台分享时生成可读的预览卡片。

#### Scenario: Facebook / LinkedIn 分享
- **WHEN** 用户在 Facebook 或 LinkedIn 粘贴页面链接
- **THEN** 生成包含标题、描述和图片的富媒体预览卡片（基于 og:title / og:description / og:image）

#### Scenario: Twitter 分享
- **WHEN** 用户在 Twitter 粘贴页面链接
- **THEN** 生成 Summary Card 样式预览（基于 twitter:card = "summary" 及相关标签）

#### Scenario: OG 标签缺失图片时
- **WHEN** `og:image` 指定的图片不存在
- **THEN** 社交平台使用文本摘要形式展示，不影响链接访问

---

### Requirement: 语义化 HTML Landmark 结构
页面 SHALL 使用正确的 HTML5 语义元素，确保屏幕阅读器和搜索引擎能准确理解页面结构。

#### Scenario: Landmark 结构审查
- **WHEN** 对页面进行无障碍审查
- **THEN** 页面包含 `<nav>`（导航栏）、`<main>`（主内容区）、`<section>`（各内容区块）、`<article>`（独立内容卡片）
- **AND** 页面有且仅有一个 `<h1>`，heading 层级不跳级

---

### Requirement: Robots.txt 爬虫策略
站点根路径 SHALL 提供 `robots.txt` 文件，声明爬虫访问策略。

#### Scenario: Google 爬虫访问 robots.txt
- **WHEN** Googlebot 请求 `/robots.txt`（或 `/my-website/robots.txt`）
- **THEN** 返回包含 `User-agent: *` 和 `Allow: /` 的文本文件

#### Scenario: 无敏感路径
- **WHEN** robots.txt 被爬虫解析
- **THEN** 不存在任何 `Disallow` 规则
