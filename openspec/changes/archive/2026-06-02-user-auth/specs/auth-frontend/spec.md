## ADDED Requirements

### Requirement: 登录页面
系统 SHALL 提供 /login 路由，渲染登录表单页面。

#### Scenario: 输入凭据登录
- **GIVEN** 用户已注册
- **WHEN** 用户在 /login 页面输入邮箱和密码并提交
- **THEN** 系统调用 POST /api/auth/login，成功后跳转到 /dashboard

#### Scenario: 登录失败提示
- **GIVEN** 用户输入错误的密码
- **WHEN** 用户提交登录表单
- **THEN** 页面显示错误提示信息，不跳转

#### Scenario: 空字段校验
- **GIVEN** 用户未填写邮箱或密码
- **WHEN** 用户提交登录表单
- **THEN** 前端阻止提交并提示必填字段

---

### Requirement: 注册页面
系统 SHALL 提供 /register 路由，渲染注册表单页面。

#### Scenario: 输入信息注册
- **GIVEN** 用户提供有效的邮箱、密码（≥6字符）和用户名
- **WHEN** 用户在 /register 页面提交注册表单
- **THEN** 系统调用 POST /api/auth/register，成功后跳转到 /dashboard

#### Scenario: 邮箱已注册提示
- **GIVEN** 邮箱已被注册
- **WHEN** 用户提交注册表单
- **THEN** 页面显示 "该邮箱已被注册" 错误提示

---

### Requirement: 路由守卫
系统 SHALL 使用 ProtectedRoute 组件保护 /dashboard/* 所有子路由。

#### Scenario: 未登录访问 Dashboard
- **GIVEN** 用户未登录
- **WHEN** 用户直接访问 /dashboard
- **THEN** 页面自动重定向到 /login

#### Scenario: 已登录访问 Dashboard
- **GIVEN** 用户已登录（AuthContext 中有有效的 user）
- **WHEN** 用户访问 /dashboard
- **THEN** 正常渲染 DashboardLayout 及其子页面

#### Scenario: Token 过期自动刷新
- **GIVEN** 用户已登录但 access token 过期
- **WHEN** 前端发起 API 请求收到 401
- **THEN** 自动调用 /api/auth/refresh 换发新 token 并重试请求
- **AND** 若 refresh 也失败，清除登录状态并重定向到 /login
