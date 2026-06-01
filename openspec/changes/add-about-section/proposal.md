## Why

当前站点缺少站长个人信息展示，访问者无法快速建立对站长的信任和了解。在项目展示后放置"关于我"区域，可形成"作品→人品"的自然叙事流，增强个人品牌的亲和力。

## What Changes

- 新增"关于我"区域组件（AboutSection），放置在项目展示区与联系我占位区之间
- 采用左右分栏布局：左侧展示个人照片，右侧展示 3 段个人简介文字
- 区域底部放置品牌标签"赋范空间"
- 照片支持 lazy loading，使用占位图策略（后续可替换真实照片）

## Capabilities

### New Capabilities

- `about-section`: 关于我区域，以左右分栏布局展示个人照片（左）和三段个人简介（右），底部放置品牌标签

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **新增文件**: `src/components/AboutSection.tsx` — "关于我"区域组件
- **新增资源**: `public/images/avatar-placeholder.svg` — 照片占位图
- **修改文件**: `src/App.tsx` — 在 ProjectShowcase 与 PlaceholderSection#contact 之间插入 AboutSection

## Out of Scope

- 联系我表单
