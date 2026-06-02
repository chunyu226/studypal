## Why

当前 StudyPal 的 AI 建议面板仅为静态 Mock 数据。接入 DeepSeek 真实 AI 能力后，学习助手可根据用户的历史学习数据和当前进度提供个性化指导——这是平台从"工具"升级为"导师"的核心体验突破。

## What Changes

- **新增后端 Chat API**: `POST /api/chat` — SSE 流式代理 DeepSeek API，注入用户学习数据作为 system prompt 上下文，对话记录存入 SQLite
- **新增后端对话历史 API**: `GET /api/chat/history` — 返回当前用户的对话列表和消息记录
- **新增 Chat 模型**: `backend/app/models/chat.py` — Conversation + Message ORM
- **新增前端 ChatPage**: `src/pages/ChatPage.tsx` — 消息气泡 ChatUI，SSE 流式接收，自动滚动到底部
- **新增 Markdown 渲染**: 使用 `react-markdown` + `react-syntax-highlighter` 渲染 AI 回复中的代码块和富文本
- **改造 Dashboard 侧边栏**: "AI 建议" 导航项指向 `/dashboard/chat` 实际对话页
- **API Key 安全**: DEEPSEEK_API_KEY 存储在 `.env` 文件中，不提交版本库

## Capabilities

### New Capabilities

- `chat-api`: FastAPI SSE 流式聊天端点，代理 DeepSeek API，注入学习数据上下文，对话持久化到 SQLite
- `chat-ui`: React 消息气泡 ChatUI，支持 SSE 流式接收、自动滚动、Markdown 渲染（含代码高亮）

### Modified Capabilities

（无——项目暂无已同步的主规范）

## Impact

- **新增依赖**: `react-markdown`、`react-syntax-highlighter`、`openai`（Python SDK 用于 DeepSeek 兼容调用）
- **新增文件**: `backend/app/models/chat.py`、`backend/app/routers/chat.py`、`src/pages/ChatPage.tsx`
- **修改文件**: `backend/app/main.py`（注册 chat router）、`src/App.tsx`（添加 /dashboard/chat 路由）、`src/components/DashboardLayout.tsx`（AI 建议 → 对话页）
- **安全**: `.env` + `.gitignore` 排除 API Key；后端从环境变量读取

## Out of Scope

- 语音输入
- 文件上传
- 模型切换（固定 DeepSeek）
