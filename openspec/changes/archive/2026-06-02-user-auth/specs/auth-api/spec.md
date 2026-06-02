## ADDED Requirements

### Requirement: 用户注册
系统 SHALL 提供 POST /api/auth/register 端点，允许新用户创建账户。

#### Scenario: 成功注册
- **GIVEN** 用户提供未注册的邮箱、密码（≥6字符）和用户名
- **WHEN** 用户发送 POST /api/auth/register
- **THEN** 系统创建用户记录，返回 201 状态码、access_token、refresh_token 和 UserProfile

#### Scenario: 邮箱已注册
- **GIVEN** 邮箱已被其他用户使用
- **WHEN** 用户发送 POST /api/auth/register
- **THEN** 返回 409 状态码和错误详情 "Email already registered"

#### Scenario: 密码过短
- **GIVEN** 用户提供少于 6 字符的密码
- **WHEN** 用户发送 POST /api/auth/register
- **THEN** 返回 422 状态码，注册不成功

---

### Requirement: 用户登录
系统 SHALL 提供 POST /api/auth/login 端点，验证用户凭据并返回 JWT token。

#### Scenario: 成功登录
- **GIVEN** 用户已注册且提供正确的邮箱和密码
- **WHEN** 用户发送 POST /api/auth/login
- **THEN** 返回 200 状态码、access_token、refresh_token 和 UserProfile

#### Scenario: 凭据错误
- **GIVEN** 用户提供错误的密码或不存在的邮箱
- **WHEN** 用户发送 POST /api/auth/login
- **THEN** 返回 401 状态码和错误详情 "Invalid email or password"

---

### Requirement: JWT Token 刷新
系统 SHALL 提供 POST /api/auth/refresh 端点，使用 refresh token 换发新的 access token。

#### Scenario: 成功刷新
- **GIVEN** 用户持有有效的 refresh token
- **WHEN** 用户发送 POST /api/auth/refresh
- **THEN** 返回 200 状态码、新的 access_token 和新的 refresh_token

#### Scenario: Token 无效或过期
- **GIVEN** refresh token 已过期或被篡改
- **WHEN** 用户发送 POST /api/auth/refresh
- **THEN** 返回 401 状态码和错误详情
