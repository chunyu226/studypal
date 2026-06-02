## ADDED Requirements

### Requirement: 消息气泡 ChatUI
ChatPage SHALL 以聊天气泡形式展示用户和 AI 的消息对话。

#### Scenario: 发送消息
- **GIVEN** 用户在 ChatPage 输入框中输入文字
- **WHEN** 用户点击发送或按 Enter
- **THEN** 用户消息以右对齐气泡显示，AI 回复以左对齐气泡流式追加

#### Scenario: 自动滚动
- **GIVEN** AI 正在流式回复，内容超出视口
- **WHEN** 新 chunk 到达并渲染
- **THEN** 消息列表自动滚动到最底部

#### Scenario: 空对话状态
- **GIVEN** 用户首次进入聊天页，无历史消息
- **WHEN** 页面渲染
- **THEN** 显示欢迎提示"Hi，我是你的学习助手，有什么可以帮你？"

---

### Requirement: Markdown 渲染
AI 回复中的 Markdown 内容 SHALL 以富文本形式渲染，代码块带有语法高亮。

#### Scenario: Markdown 文本渲染
- **GIVEN** AI 回复包含 `**粗体**`、`- 列表`、`[链接](url)` 等 Markdown 语法
- **WHEN** 消息气泡渲染
- **THEN** 内容以对应的富文本格式显示

#### Scenario: 代码块高亮
- **GIVEN** AI 回复包含 ` ```python ... ``` ` 代码块
- **WHEN** 消息气泡渲染
- **THEN** 代码块以深色背景显示，Python 语法高亮

#### Scenario: Markdown 渲染失败降级
- **GIVEN** AI 回复包含格式异常的 Markdown
- **WHEN** react-markdown 渲染
- **THEN** 以纯文本形式显示，不报错

---

### Requirement: 对话历史侧边栏
ChatPage SHALL 在左侧显示历史对话列表。

#### Scenario: 历史对话列表
- **GIVEN** 用户有历史对话记录
- **WHEN** 用户进入 ChatPage
- **THEN** 左侧显示对话列表（标题 + 时间），点击可切换对话

#### Scenario: 新建对话
- **WHEN** 用户点击"新建对话"按钮
- **THEN** 清空当前消息列表，输入框准备接收新消息
