## 1. 创建 Navbar 组件

- [ ] 1.1 创建 `src/components/Navbar.tsx`，实现固定顶部导航栏骨架（品牌名 + 导航链接列表）
- [ ] 1.2 实现滚动检测逻辑：`scrollY > 10` 时启用背景模糊效果（`backdrop-blur-lg` + 半透明背景），顶部时完全透明，切换带有 `transition-all duration-300`
- [ ] 1.3 实现导航链接点击平滑滚动：使用 `Element.scrollIntoView({ behavior: 'smooth' })` 滚动到对应 section id，处理目标不存在的边界情况

## 2. 集成到 App 并添加 section 锚点

- [ ] 2.1 修改 `src/App.tsx`，引入 Navbar，将 Hero 的 section id 设为 `hero`，并为 section 添加 `scroll-mt-20` 避免被导航栏遮挡
- [ ] 2.2 在 Hero 下方添加占位的 `#projects` 和 `#contact` section（后续可替换为实际内容）

## 3. 移动端适配

- [ ] 3.1 添加汉堡菜单按钮（`md:hidden` 显示），点击切换 `isOpen` 状态
- [ ] 3.2 实现移动端下拉菜单，展开时从右上方滑入，点击导航项后自动关闭菜单
