## 1. 后端脚手架

- [x] 1.1 创建 `backend/` 目录结构，编写 `requirements.txt`（fastapi、uvicorn、sqlalchemy、alembic、passlib[bcrypt]、pyjwt、pydantic）
- [x] 1.2 编写 `backend/app/config.py`（SECRET_KEY、DATABASE_URL=sqlite:///./studypal.db、ACCESS_TOKEN_EXPIRE_MINUTES、REFRESH_TOKEN_EXPIRE_DAYS）
- [x] 1.3 编写 `backend/app/database.py`（SQLAlchemy async engine + sessionmaker + Base）
- [x] 1.4 初始化 Alembic（`alembic init`），配置 `alembic.ini` 和 `env.py` 指向 SQLite

### 验证
`uvicorn app.main:app --reload` 启动成功，访问 http://localhost:8000/docs 显示 Swagger UI

---

## 2. 后端用户模型与认证

- [x] 2.1 编写 `backend/app/models/user.py` — User ORM 模型（id、email、name、password_hash、avatar_url、streak_days、level、created_at、updated_at）
- [x] 2.2 运行 `alembic revision --autogenerate` + `alembic upgrade head` 创建 users 表
- [x] 2.3 编写 `backend/app/services/auth.py` — `hash_password()`、`verify_password()`、`create_access_token()`、`create_refresh_token()`、`decode_token()`
- [x] 2.4 编写 `backend/app/schemas/auth.py` — RegisterRequest、LoginRequest、TokenRefreshRequest、TokenResponse
- [x] 2.5 编写 `backend/app/routers/auth.py` — POST /api/auth/register、POST /api/auth/login、POST /api/auth/refresh

### 验证
用 curl/Postman 测试 register → login → refresh 完整流程

---

## 3. 后端用户 Profile

- [x] 3.1 编写 `backend/app/schemas/user.py` — UserProfile schema（id、email、name、avatar_url、streak_days、level）
- [x] 3.2 编写 `backend/app/routers/users.py` — GET /api/users/me（依赖 JWT 验证）
- [x] 3.3 编写 `backend/app/main.py` — 组装 FastAPI app、注册路由、配置 CORS、添加 lifespan
- [x] 3.4 编写 `backend/app/dependencies.py` — `get_current_user` 依赖（从 Authorization header 解析 JWT→查询用户）

### 验证
GET /api/users/me 返回认证用户的 Profile，level = floor(streak_days / 7) + 1

---

## 4. 前端认证基础设施

- [x] 4.1 编写 `src/api/client.ts` — fetch 封装（base URL、JWT 拦截器、401 自动刷新+重试、token 存储）
- [x] 4.2 编写 `src/contexts/AuthContext.tsx` — AuthProvider（user state、login/register/logout/refreshToken 方法、应用启动时自动恢复会话）
- [x] 4.3 编写 `src/components/ProtectedRoute.tsx` — 检查 auth state，未登录重定向到 /login，加载中显示 spinner
- [x] 4.4 配置 Vite proxy（`vite.config.ts` server.proxy: `/api` → `http://localhost:8000`）

### 验证
`npx tsc --noEmit` 通过，AuthContext 在 React DevTools 中可见

---

## 5. 前端登录/注册页面

- [x] 5.1 编写 `src/pages/LoginPage.tsx` — 邮箱+密码表单，调用 AuthContext.login()，错误提示，成功后跳转 /dashboard
- [x] 5.2 编写 `src/pages/RegisterPage.tsx` — 邮箱+密码+用户名表单，调用 AuthContext.register()，错误提示（含 409 已注册），成功后跳转 /dashboard
- [x] 5.3 修改 `src/App.tsx` — 添加 /login、/register 路由，用 ProtectedRoute 包裹 /dashboard/*，全局挂载 AuthProvider

### 验证
浏览器访问 /login → 输入凭据 → 登录成功 → 自动跳转 /dashboard

---

## 6. Dashboard Profile 集成

- [x] 6.1 修改 `src/components/DashboardLayout.tsx` — 侧边栏底部从 ThemeToggle 替换为用户 Profile 区域（头像+用户名+等级+打卡天数），保留 ThemeToggle 在旁边
- [x] 6.2 编写用户等级徽章样式（Lv.N 胶囊 badge，颜色随等级变化）
- [x] 6.3 添加默认头像占位（复用 AboutSection 的 Avatar 组件模式：`onError` → 人像轮廓 SVG）

### 验证
登录后 Dashboard 侧边栏底部显示用户信息，头像、等级、打卡天数正确渲染
