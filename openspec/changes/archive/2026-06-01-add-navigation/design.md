## Context

当前站点为单页结构，App.tsx 中只渲染 Hero 区域和主题切换按钮。导航栏需要：
- 固定在页面顶部，始终可见
- 滚动前透明，滚动后出现背景模糊（glassmorphism）
- 平滑滚动到目标 section（anchor navigation）
- 移动端适配（汉堡菜单）

## Goals / Non-Goals

**Goals:**
- 实现固定顶部的导航栏，左侧品牌名，右侧导航链接
- 页面滚动到任意 section 时导航栏显示背景模糊效果
- 点击导航链接平滑滚动到对应 section，无需跨页跳转
- 移动端自动切换为汉堡菜单
- 支持亮/暗双模式

**Non-Goals:**
- 搜索功能
- 多级下拉菜单
- 用户登录/注册

## Decisions

### 1. 导航栏结构：单文件组件 Navbar.tsx

Navbar 为一个自包含的 TypeScript 函数式组件，通过 props 接收 `theme` 用于暗色模式适配。不引入路由库——当前为单页设计，导航通过 anchor 滚动实现。

### 2. 滚动监听：useState + scroll 事件

使用 `useState` 追踪 `isScrolled` 状态，在 `useEffect` 中监听 `window.scroll` 事件。当 `scrollY > 10` 时切换为模糊背景。使用 `passive: true` 提升性能。

### 3. 背景模糊：Tailwind backdrop-blur

当 `isScrolled` 为 true 时添加 `backdrop-blur-lg bg-white/70 dark:bg-slate-900/70`，未滚动时保持 `bg-transparent`。过渡动画使用 `transition-all duration-300`。

### 4. 平滑滚动：Element.scrollIntoView

点击导航链接时调用 `document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })`。不需要 CSS `scroll-behavior`（避免全局强制平滑）。

### 5. 移动端菜单：useState 控制展开/折叠

使用 `useState` 管理 `isOpen` 状态，当屏幕宽度 < 768px 时显示汉堡按钮，点击展开垂直菜单。点击菜单项后自动关闭菜单。

### 6. 性能：零依赖，组件轻量

导航栏仅使用 React 原生 API 和 Tailwind CSS，不引入任何第三方库。组件自身 < 2KB gzip，不影响首屏加载目标。

## Risks / Trade-offs

- **scroll 事件频率** → 使用 `passive: true`，不做频繁 DOM 写入，仅在阈值切换时更新状态
- **anchor 滚动可能被地址栏遮挡** → 使用 `scroll-margin-top: 5rem` 在 section 上预留空间
- **section 不存在时静默失败** → 已有 `getElementById` 返回 null 时不做任何操作
