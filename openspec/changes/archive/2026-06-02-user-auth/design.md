## Context

当前 StudyPal Dashboard 无用户系统，所有学习数据为全局 Mock。本次引入 FastAPI + JWT 认证，建立以用户为中心的数据隔离，为后续学习记录持久化打基础。

## Goals / Non-Goals

**Goals:**
- FastAPI 后端，SQLite + Alembic 迁移管理
- JWT access/refresh token 双 token 机制
- 前端 AuthContext 全局状态 + 路由守卫
- 登录/注册页面（复用现有 Tailwind 样式体系）
- Dashboard 侧边栏展示用户 Profile（头像、连续学习天数、等级）

**Non-Goals:**
- 后台管理 / RBAC / OAuth / 邮箱验证 / 密码重置

## Decisions

### 1. 组件层级图

```
App (BrowserRouter, basename="/my-website")
│
├── Route "/" → BrandPage (已存在，无认证要求)
│
├── Route "/login" → LoginPage (新增)
├── Route "/register" → RegisterPage (新增)
│
├── Route "/dashboard" → (ProtectedRoute 包裹)
│   └── DashboardLayout (改造: 侧边栏底部显示 Profile)
│       ├── Route index → DashboardHome
│       ├── Route "courses" → PlaceholderPage
│       ├── Route "notes" → PlaceholderPage
│       ├── Route "ai" → PlaceholderPage
│       └── Route "settings" → PlaceholderPage
│
└── AuthProvider (包裹所有 Route，提供 auth state)
```

### 2. 项目目录结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, CORS, lifespan
│   ├── config.py            # Settings (SECRET_KEY, DATABASE_URL)
│   ├── database.py          # SQLAlchemy async engine + session
│   ├── models/
│   │   └── user.py          # User ORM model
│   ├── schemas/
│   │   └── auth.py          # Pydantic: RegisterRequest, LoginRequest, TokenResponse
│   │   └── user.py          # Pydantic: UserProfile
│   ├── routers/
│   │   └── auth.py          # POST /register, POST /login, POST /refresh
│   │   └── users.py         # GET /users/me
│   ├── services/
│   │   └── auth.py          # JWT encode/decode, password hash/verify
│   └── migrations/          # Alembic 自动生成
├── alembic.ini
├── requirements.txt
└── seed.py                  # 可选：创建测试用户
```

### 3. JWT Token 策略

- **Access Token**: 过期 30 分钟，存于内存 (AuthContext)，每次请求随 `Authorization: Bearer` 头发送
- **Refresh Token**: 过期 7 天，存于 localStorage，用于换取新 access token
- **Token 刷新时机**: API 请求返回 401 时自动用 refresh token 换取新 access token，重试原请求
- **算法**: HS256，密钥从环境变量 `SECRET_KEY` 读取（dev 默认值）
- **Payload**: `{ sub: user_id, exp: timestamp }`

### 4. 密码安全

- 使用 `passlib[bcrypt]` 进行 bcrypt 哈希
- 注册和登录时密码明文仅存在于请求体内，不记录日志
- 密码最小长度 6 字符（前端 + 后端双重校验）

### 5. 前端 Auth 状态管理

- `AuthContext` 提供: `user`, `login()`, `register()`, `logout()`, `refreshToken()`, `isLoading`
- Access token 存于 AuthContext state（内存），页面刷新后通过 refresh token 自动恢复会话
- `ProtectedRoute` 检查 `user` 是否存在 + `isLoading` 状态，未认证重定向到 `/login`
- `api/client.ts`: 封装 fetch，自动附加 `Authorization` 头和处理 401 → 自动刷新 → 重试

### 6. Vite Dev Proxy

```ts
// vite.config.ts 添加:
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

开发时前端 `fetch('/api/auth/login')` 自动代理到 FastAPI，避免 CORS 问题。生产环境前端和后端分别部署（不在本次范围）。

## API 端点规范

### POST /api/auth/register
- **Request**: `{ email: str, password: str, name: str }`
- **Response 201**: `{ access_token: str, refresh_token: str, user: UserProfile }`
- **Response 409**: `{ detail: "Email already registered" }`

### POST /api/auth/login
- **Request**: `{ email: str, password: str }`
- **Response 200**: `{ access_token: str, refresh_token: str, user: UserProfile }`
- **Response 401**: `{ detail: "Invalid email or password" }`

### POST /api/auth/refresh
- **Request**: `{ refresh_token: str }`
- **Response 200**: `{ access_token: str, refresh_token: str }`
- **Response 401**: `{ detail: "Invalid or expired refresh token" }`

### GET /api/users/me
- **Headers**: `Authorization: Bearer <access_token>`
- **Response 200**: `{ id: str, email: str, name: str, avatar_url: str | null, streak_days: int, level: int }`
- **Response 401**: `{ detail: "Not authenticated" }`

### 用户等级算法
- `level = streak_days // 7 + 1` (每连续打卡 7 天升 1 级，最低 1 级)

## Risks / Trade-offs

- **Refresh token 存 localStorage** → XSS 可窃取。Mitigation: 后续添加 httpOnly cookie 方案；当前阶段 acceptable risk（MVP 无敏感数据）
- **SQLite 并发写瓶颈** → 单用户场景无影响；多用户时迁移到 PostgreSQL
- **后端需独立部署** → GitHub Pages 不支持 Python 后端，需额外服务（Railway/Render/VPS）。本地开发不受影响
- **前后端部署分离** → 生产环境需配置 CORS origins 或 Nginx 反代
