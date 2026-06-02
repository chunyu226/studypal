## Context

当前 Dashboard 侧边栏的 `/dashboard/ai` 为占位页。本次用真实 DeepSeek 对话页替换，后端 SSE 流式代理，前端 ChatUI 渲染。

## Goals / Non-Goals

**Goals:**
- DeepSeek API 流式 SSE 代理，注入用户学习数据作为 context
- 对话记录持久化到 SQLite（Conversation + Message）
- 前端 ChatUI：消息气泡 + SSE EventSource 流式接收 + auto-scroll + Markdown 渲染
- API Key 通过环境变量 `.env` 管理，不提交版本库

**Non-Goals:**
- 语音输入 / 文件上传 / 模型切换

## Decisions

### 1. 组件层级图

```
App
├── Route "/" → BrandPage (不变)
└── Route "/dashboard" → ProtectedRoute → DashboardLayout
    ├── Sidebar: "AI 建议" → NavLink to="/dashboard/chat"
    └── <Outlet>
        ├── Route index → DashboardHome
        ├── Route "chat" → ChatPage (新增)
        │   ├── MessageList
        │   │   └── MessageBubble × N (用户: 右对齐 indigo, AI: 左对齐 slate)
        │   │       └── ReactMarkdown (代码高亮)
        │   └── ChatInput (textarea + 发送按钮)
        └── ...
```

### 2. SSE 流式架构

```
浏览器 (EventSource)
  │ POST /api/chat { message, conversation_id? }
  ▼
FastAPI (SSE StreamingResponse)
  │ 1. 保存用户消息到 DB
  │ 2. 查询用户学习数据构建 system prompt
  │ 3. openai SDK stream=True → DeepSeek API
  │ 4. yield 每个 chunk 作为 SSE data
  │ 5. 流结束后保存 AI 回复到 DB
  ▼
DeepSeek API (api.deepseek.com/v1/chat/completions)
```

### 3. DeepSeek 接入

- 使用 `openai` Python SDK（DeepSeek 兼容 OpenAI 接口格式）
- Base URL: `https://api.deepseek.com`
- Model: `deepseek-chat`
- 不设置 `max_tokens`（让模型自行判断，但限制前端显示）
- `temperature: 0.7`（学习场景适中创造性）

### 4. 个性化 Context 注入

```python
system_prompt = f"""你是 StudyPal 学习助手。基于以下用户数据提供个性化建议：
- 今日学习时长：{stats.study_hours}h
- 完成课程数：{stats.completed_courses}
- 连续打卡：{user.streak_days}天
- 用户等级：Lv.{user.level}
请用中文回复，风格亲切鼓励。"""
```

### 5. 数据模型

```python
class Conversation(Base):
    id: str (UUID)
    user_id: str (FK → users.id)
    title: str (自动截取首条消息前30字)
    created_at: datetime

class Message(Base):
    id: str (UUID)
    conversation_id: str (FK → conversations.id)
    role: str ("user" | "assistant")
    content: str (TEXT)
    created_at: datetime
```

### 6. 前端流式接收

使用 `EventSource` 或 `fetch` + `ReadableStream` 接收 SSE。`EventSource` 仅支持 GET，POST 需用 `fetch` + streaming。选择 `fetch` + `getReader()` 手动解析 SSE：

```typescript
const response = await fetch('/api/chat', { method: 'POST', body })
const reader = response.body!.getReader()
const decoder = new TextDecoder()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  // parse SSE "data: {...}" lines
}
```

### 7. Markdown 渲染

- `react-markdown` 渲染 AI 回复中的 Markdown
- `react-syntax-highlighter` + `Prism` 主题渲染代码块
- Tailwind `prose` 类（需 `@tailwindcss/typography` 插件）控制排版

## API 端点规范

### POST /api/chat
- **Headers**: `Authorization: Bearer <token>`
- **Request**: `{ message: str, conversation_id?: str }`
- **Response**: `text/event-stream`
  - `data: {"type":"chunk","content":"..."}`
  - `data: {"type":"done","conversation_id":"...","message_id":"..."}`
- **Error**: SSE 流中 `{"type":"error","detail":"..."}`

### GET /api/chat/conversations
- **Headers**: `Authorization: Bearer <token>`
- **Response 200**: `[{ id, title, created_at, last_message_preview }]`

### GET /api/chat/conversations/{id}/messages
- **Headers**: `Authorization: Bearer <token>`
- **Response 200**: `[{ id, role, content, created_at }]`

## Risks / Trade-offs

- **API Key 泄露** → `.env` + `.gitignore` 排除；后端启动时校验 key 存在性
- **DeepSeek API 限流** → 单用户场景无忧；后续添加 rate limiting
- **SSE 连接中断** → 前端 `reader.cancel()` 时保存已接收内容；重连时需重新发送完整请求
- **Conversation 无限增长** → 当前无分页；MVP 阶段单用户量小，后续添加分页
