## Why

当前 #projects section 仅显示占位内容（"内容即将上线"），访问者无法了解站长的项目经验和作品。将 Hero 的 CTA 按钮落地到真实项目展示区，可形成完整的内容浏览闭环。

## What Changes

- 新增项目展示区组件（ProjectShowcase），替换当前 #projects 占位 section
- 卡片式布局，每张卡片包含：项目截图、项目名称、项目简介、GitHub 链接
- 至少展示 4 个项目
- 鼠标悬浮卡片时显示微缩放 + 阴影增强特效
- 图片全部使用 lazy loading

**功能修改**：
- Hero 的 CTA 按钮（"查看我的项目"）从 `/my-website/projects` 改为锚点 `#projects`，点击后平滑滚动到项目展示区

## Capabilities

### New Capabilities

- `project-showcase`: 项目展示区，以卡片网格布局展示至少 4 个项目，每个项目包含截图、名称、简介和 GitHub 链接，支持悬浮微特效

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **新增文件**: `src/components/ProjectShowcase.tsx` — 项目展示区组件
- **新增资源**: `public/images/projects/` — 项目截图（至少 4 张，后续可替换为真实截图）
- **修改文件**: `src/App.tsx` — 用 ProjectShowcase 替换 #projects 的 PlaceholderSection
- **修改文件**: `src/components/Hero.tsx` — CTA 按钮 href 从 `/my-website/projects` 改为锚点 `#projects`

## Out of Scope

- 项目详情页
- 项目搜索功能
