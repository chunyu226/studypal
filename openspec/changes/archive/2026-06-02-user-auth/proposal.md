## Why

当前 StudyPal Dashboard 无用户系统，所有数据为全局 Mock。引入 JWT 认证和用户 Profile 是平台个人化的基础——用户需要自己的学习数据、连续打卡记录和等级成长体系。这是从 Demo 走向 MVP 的关键一步。

## What Changes

- **新增后端服务**: `backend/` 目录，基于 FastAPI + SQLite 3 + Alembic 数据库迁移
- **用户注册/登录 API**: `/api/auth/register`、`/api/auth/login`，返回 JWT access token + refresh token
- **Token 刷新 API**: `/api/auth/refresh`，使用 refresh token 换发新 access token
- **用户 Profile API**: `/api/users/me`，返回头像、连续学习天数、用户等级
- **新增前端页面**: 登录页 `/login` 和注册页 `/register`
- **前端 Auth 状态管理**: React Context 管理 token 存储、自动刷新、登录状态
- **Dashboard 路由守卫**: 未登录用户访问 `/dashboard/*` 自动重定向到 `/login`
- **Dashboard 侧边栏**: 底部显示当前用户头像 + 等级 + 打卡天数

## Capabilities

### New Capabilities

- `auth-api`: FastAPI 后端认证服务，包含用户注册、登录、JWT token 签发与刷新
- `auth-frontend`: 前端登录/注册页面、AuthContext 状态管理、Dashboard 路由守卫
- `user-profile`: 用户 Profile API 与前端展示（头像、连续学习天数、用户等级）

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **新增目录**: `backend/` — FastAPI 应用 + Alembic 迁移 + requirements.txt
- **新增文件**: `src/pages/LoginPage.tsx`、`src/pages/RegisterPage.tsx` — 登录/注册页
- **新增文件**: `src/contexts/AuthContext.tsx` — Auth 状态管理 + ProtectedRoute
- **新增文件**: `src/api/client.ts` — API 请求封装（base URL + JWT 拦截器）
- **修改文件**: `src/App.tsx` — 添加 `/login`、`/register` 路由 + Dashboard 路由守卫
- **修改文件**: `src/components/DashboardLayout.tsx` — 侧边栏底部显示用户 Profile
- **不影响**: 品牌站（`/`）、现有组件、前端构建流程

## Out of Scope

- 后台管理系统
- OAuth / 第三方登录
- 邮箱验证 / 密码重置
- 用户角色和权限（RBAC）
- 用户间社交功能

## Rollback Plan

后端与前端完全解耦，回滚无风险：
1. 删除 `backend/` 目录
2. 移除 `src/pages/LoginPage.tsx`、`RegisterPage.tsx`、`src/contexts/AuthContext.tsx`
3. 恢复 `App.tsx` 为无认证版本，移除路由守卫
4. 恢复 `DashboardLayout.tsx` 底部 Profile 为 ThemeToggle 原样
5. 前端回到 Mock 数据模式，零数据损失
