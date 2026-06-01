## Context

项目从零开始，无已有代码。需要第一个面向用户的组件——Hero section。该组件是所有后续内容的视觉锚点和导航起点。

技术约束：
- React 19 + Vite 7 + TypeScript + Tailwind CSS v4
- 部署在 GitHub Pages，base path 为 `/my-website/`
- 零外部依赖，所有功能手写
- 首屏加载目标 < 2 秒

## Goals / Non-Goals

**Goals:**
- 全屏 Hero 垂直居中布局，展示姓名、职业、一句话介绍
- Canvas 静态粒子网格背景，叠加 CSS 渐变色底
- 亮/暗模式切换，状态持久化到 localStorage
- CTA 按钮跳转至项目页
- 移动端适配（dvh 高度 + 粒子密度减半）
- 首屏文字立即可见，Canvas 不阻塞 FCP

**Non-Goals:**
- 不做粒子动画（无 requestAnimationFrame 循环）
- 不做导航栏
- 不做后端 API
- 不引入外部依赖（包括 tsparticles 等库）

## Decisions

### 1. 粒子背景：Canvas 2D 静态绘制

**选择**：用 `<canvas>` 元素在 mount 时一次性绘制粒子网格，不做动画循环。

**理由**：
- 动画属于 out-of-scope，静态绘制足够传达"科技感"视觉效果
- 零性能开销（无 RAF 循环），首屏加载快
- 代码量 < 150 行，可控

**替代方案已排除**：
- tsparticles 库：引入 50KB+ 依赖，违反零依赖原则
- 纯 CSS 粒子：效果单薄，无法绘制连线网格
- WebGL/Three.js：严重过度设计

**粒子视觉规格**：
```
Canvas 绘制内容：
  · 50-80 个粒子节点（移动端减半）
  · 粒子半径 1.5px-3px 随机
  · 相邻粒子距离 < 150px 时绘制半透明连线
  · 暗色模式：粒子 #4fc3f7 / 连线 rgba(79,195,247,0.15)
  · 亮色模式：粒子 #4f46e5 / 连线 rgba(79,70,229,0.25)
  · 背景：Canvas 透明，叠加在 CSS 渐变之上
```

### 2. 主题切换：Tailwind `class` 策略 + localStorage

**选择**：使用 Tailwind v4 的 `class` dark mode 策略，由 `useTheme` hook 管理状态。

**数据流**：
```
localStorage("theme") → useTheme() → <html class="dark"> → Tailwind dark: 前缀生效
                                     → ThemeToggle 按钮图标
                                     → Canvas 重绘（颜色切换）
```

**理由**：
- 用户手动切换优先于系统偏好
- 首次访问回退到 `prefers-color-scheme` 媒体查询
- localStorage 保证刷新后持久化

### 3. Hero 高度：dvh + screen fallback

**选择**：`min-h-screen` 作为 baseline，`min-h-dvh` 作为 progressive enhancement。

**理由**：
- iOS Safari 地址栏折叠导致 `100vh` 计算偏差
- `dvh` 是 CSS 新单位，需要 fallback
- Tailwind v4 原生支持 `min-h-dvh`

### 4. CTA 按钮：原生 `<a>` 标签

**选择**：使用 `<a href="/my-website/projects">` 而非 React Router `<Link>`。

**理由**：
- 当前只有 Hero，无需引入路由库
- GitHub Pages 静态托管，`/my-website/projects` 对应 `projects/index.html`
- 后续若引入 React Router 再替换，改动范围仅一处

### 5. 组件结构

```
src/
├── components/
│   ├── Hero.tsx              # Hero 布局容器 + 内容
│   ├── ParticleBackground.tsx # Canvas 粒子绘制
│   └── ThemeToggle.tsx       # 亮/暗切换按钮
├── hooks/
│   └── useTheme.ts           # 主题状态管理
├── App.tsx                   # 入口，引入 Hero
├── index.css                 # Tailwind + 暗色变量
└── main.tsx                  # Vite 入口
```

## Risks / Trade-offs

| 风险 | 概率 | 缓解措施 |
|------|------|----------|
| Canvas 在 iOS Safari 低版本兼容问题 | 低 | Canvas 2D API 兼容性极好，覆盖 99%+ 浏览器 |
| `dvh` 单位在旧浏览器不支持 | 中 | `min-h-screen` fallback + `@supports` 检测 |
| 静态粒子在暗/亮切换时需要重绘 | 低 | 监听 theme 变化 → Canvas getContext 重新绘制 |
| 不同屏幕尺寸下粒子密度不适配 | 低 | mount/resize 时根据 viewport 宽度动态计算粒子数 |

## Open Questions

- 用户的姓名、职业、一句话介绍具体文案？（当前使用占位文本，后续替换）
- CTA 按钮文案？（当前默认 "查看我的项目"）
