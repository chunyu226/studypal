## Why

个人品牌站目前是一个空项目，缺乏任何面向访客的内容。Hero section 是用户落地后的第一印象——需要在 3 秒内传达"我是谁、我做什么"，并提供进入核心内容（项目作品）的入口。此时创建 Hero 是项目的第一个里程碑，后续所有板块将以此为基础。

## What Changes

- 新增全屏高度 Hero section，垂直居中展示姓名、职业、一句话介绍
- 新增 CTA 按钮，点击后跳转至项目页面（`/my-website/projects`）
- 新增 Canvas 粒子背景（静态科技感网格，叠加在 CSS 渐变底之上）
- 新增亮色/暗色模式切换按钮，手动切换主题
- 新增 `useTheme` hook，管理主题状态并持久化到 localStorage

## Capabilities

### New Capabilities

- `hero-section`: 全屏 Hero 区域的布局、内容展示与 CTA 交互
- `particle-background`: Canvas 绘制的静态科技粒子网格背景，支持亮/暗颜色适配
- `theme`: 亮色/暗色模式的状态管理、切换、持久化，以及全局 Tailwind dark class 联动

### Modified Capabilities

<!-- 当前无已有 spec，无需修改现有能力 -->

## Out of Scope

- 不做粒子动画效果（静态绘制，无 requestAnimationFrame 循环）
- 不做导航栏（Navbar）
- 不做后端 API
- 不做其他页面板块（About、Skills、Contact 等）

## Impact

- 新增文件：`src/components/Hero.tsx`、`src/components/ParticleBackground.tsx`、`src/components/ThemeToggle.tsx`、`src/hooks/useTheme.ts`
- 修改文件：`src/App.tsx`（引入 Hero）、`src/index.css`（Tailwind 入口 + 暗色变量）
- 新增依赖：无（全部手写，零外部依赖）
- 对现有功能影响：无（项目从零开始，无存量代码）
