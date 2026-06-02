## 1. 后端基础设施

- [x] 1.1 安装 `openai` Python SDK，在 `backend/app/config.py` 添加 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_BASE_URL` 配置
- [x] 1.2 创建 `backend/app/models/chat.py` — Conversation + Message ORM 模型
- [x] 1.3 创建 `backend/.env` 文件存储 API Key，更新 `.gitignore` 排除 `.env`

### 验证
`uvicorn app.main:app --reload` 启动无报错

---

## 2. 后端 Chat API

- [x] 2.1 创建 `backend/app/services/chat.py` — `build_system_prompt(user)` 注入学习数据上下文，`stream_deepseek(messages)` 调用 DeepSeek SSE 流式返回
- [x] 2.2 创建 `backend/app/routers/chat.py` — POST /api/chat（SSE StreamingResponse，保存消息到 DB），GET /api/chat/conversations，GET /api/chat/conversations/{id}/messages
- [x] 2.3 注册 chat router 到 `backend/app/main.py`

### 验证
curl POST /api/chat 返回 SSE 流，conversations 和 messages 表正确存储

---

## 3. 前端依赖与 ChatPage

- [x] 3.1 安装 `react-markdown` + `react-syntax-highlighter` + `@types/react-syntax-highlighter`
- [x] 3.2 创建 `src/pages/ChatPage.tsx` — 消息气泡列表（用户右对齐 indigo，AI 左对齐 slate）+ 底部输入框 + 自动滚动到底部
- [x] 3.3 实现 SSE 流式接收（fetch + ReadableStream getReader + TextDecoder 解析 SSE）
- [x] 3.4 AI 回复气泡使用 react-markdown 渲染（含代码块语法高亮 Prism 主题）

### 验证
浏览器输入消息 → 流式显示 AI 回复 → Markdown 正确渲染

---

## 4. 集成与路由

- [x] 4.1 修改 `src/App.tsx` — `/dashboard/chat` 路由指向 ChatPage（在 ProtectedRoute 内）
- [x] 4.2 修改 `src/components/DashboardLayout.tsx` — 侧边栏"AI 建议" NavLink 指向 `/dashboard/chat`
- [x] 4.3 创建 `src/pages/ChatPage.tsx` 左侧历史对话列表（GET /api/chat/conversations），点击切换 + 新建按钮

### 验证
Dashboard → 侧边栏"AI 建议" → ChatPage 完整可用
