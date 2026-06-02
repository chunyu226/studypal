## ADDED Requirements

### Requirement: SSE 流式聊天
系统 SHALL 提供 POST /api/chat 端点，接收用户消息并以 SSE 流式返回 AI 回复。

#### Scenario: 发送消息并接收流式回复
- **GIVEN** 用户已登录且提供消息内容
- **WHEN** 用户发送 POST /api/chat
- **THEN** 系统返回 text/event-stream，每个 chunk 包含 `{"type":"chunk","content":"..."}`
- **AND** 流结束前发送 `{"type":"done","conversation_id":"..."}`

#### Scenario: 新对话自动创建
- **GIVEN** 用户首次发送消息且未指定 conversation_id
- **WHEN** 用户发送 POST /api/chat
- **THEN** 系统自动创建新 Conversation，标题为首条消息前 30 字

#### Scenario: 继续已有对话
- **GIVEN** 用户指定有效的 conversation_id
- **WHEN** 用户发送 POST /api/chat
- **THEN** AI 回复追加到已有对话中，包含历史消息上下文

#### Scenario: API Key 未配置
- **GIVEN** 后端 DEEPSEEK_API_KEY 环境变量未设置
- **WHEN** 用户发送 POST /api/chat
- **THEN** SSE 流返回 `{"type":"error","detail":"AI service unavailable"}`

---

### Requirement: 对话历史查询
系统 SHALL 提供 GET /api/chat/conversations 和 GET /api/chat/conversations/{id}/messages 端点。

#### Scenario: 获取对话列表
- **GIVEN** 用户已登录且有历史对话
- **WHEN** 用户发送 GET /api/chat/conversations
- **THEN** 返回当前用户的对话列表，按时间倒序，每条含 id、title、最后消息预览

#### Scenario: 获取对话消息
- **GIVEN** 用户拥有某个 conversation 的访问权限
- **WHEN** 用户发送 GET /api/chat/conversations/{id}/messages
- **THEN** 返回该对话的全部消息，按时间正序

#### Scenario: 查询他人对话被拒绝
- **GIVEN** 用户尝试访问不属于自己的 conversation
- **WHEN** 用户发送 GET /api/chat/conversations/{other_id}/messages
- **THEN** 返回 403 状态码

---

### Requirement: 个性化上下文注入
后端 SHALL 在调用 DeepSeek API 时注入当前用户的学习数据作为 system prompt。

#### Scenario: 学习数据上下文注入
- **GIVEN** 用户已登录且有学习数据
- **WHEN** 后端构建 DeepSeek API 请求
- **THEN** system prompt 包含用户的连续打卡天数、等级
