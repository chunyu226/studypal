import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useAuth } from '../contexts/AuthContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: string
  title: string
  created_at: string
  last_message_preview: string
}

const WelcomeMessage = () => (
  <div className="flex flex-1 flex-col items-center justify-center text-center">
    <div className="mb-4 text-5xl">🤖</div>
    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
      Hi，我是你的学习助手
    </h3>
    <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
      有什么可以帮你？我可以根据你的学习数据提供个性化建议。
    </p>
  </div>
)

const ChatPage = () => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConvId, setActiveConvId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamContent, setStreamContent] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Load conversation list
  useEffect(() => {
    fetch('/api/chat/conversations', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token') || ''}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setConversations(data)
      })
      .catch(() => {})
  }, [])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamContent])

  const loadConversation = useCallback(async (convId: string) => {
    setActiveConvId(convId)
    const res = await fetch(`/api/chat/conversations/${convId}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token') || ''}` },
    })
    if (res.ok) {
      const data = await res.json()
      setMessages(data)
    }
  }, [])

  const handleNewChat = () => {
    setActiveConvId(null)
    setMessages([])
    inputRef.current?.focus()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || streaming) return

    const userMessage = input.trim()
    setInput('')
    setStreaming(true)
    setStreamContent('')

    // Add user message to UI
    const tempUserMsg: Message = { id: crypto.randomUUID(), role: 'user', content: userMessage }
    setMessages((prev) => [...prev, tempUserMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: activeConvId,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullContent = ''
      let newConvId = activeConvId

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'chunk') {
                fullContent += data.content
                setStreamContent(fullContent)
              } else if (data.type === 'done') {
                newConvId = data.conversation_id
                if (!activeConvId && newConvId) {
                  setActiveConvId(newConvId)
                  // Refresh conversation list
                  fetch('/api/chat/conversations', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token') || ''}` },
                  })
                    .then((r) => r.json())
                    .then((d) => { if (Array.isArray(d)) setConversations(d) })
                    .catch(() => {})
                }
              }
            } catch {
              // skip malformed SSE
            }
          }
        }
      }

      // Add AI message to UI
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: fullContent },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: '抱歉，请求失败，请稍后重试。' },
      ])
    } finally {
      setStreamContent('')
      setStreaming(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-full">
      {/* Conversation sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 lg:flex">
        <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-700">
          <button
            onClick={handleNewChat}
            className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            + 新建对话
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => loadConversation(c.id)}
              className={`w-full px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                activeConvId === c.id ? 'bg-indigo-50 dark:bg-slate-700' : ''
              }`}
            >
              <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                {c.title}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-400 dark:text-slate-500">
                {c.last_message_preview}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-auto px-4 py-4">
          {messages.length === 0 && !streaming ? (
            <div className="flex h-full items-center justify-center">
              <WelcomeMessage />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {streamContent && (
                <MessageBubble
                  message={{ id: 'streaming', role: 'assistant', content: streamContent }}
                  isStreaming
                />
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入消息，Enter 发送..."
              rows={1}
              disabled={streaming}
              className="flex-1 resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              {streaming ? '...' : '发送'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const MessageBubble = ({
  message,
  isStreaming = false,
}: {
  message: Message
  isStreaming?: boolean
}) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950'
            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-slate-800 prose-code:text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  const codeStr = String(children).replace(/\n$/, '')
                  if (match) {
                    return (
                      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
                        {codeStr}
                      </SyntaxHighlighter>
                    )
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
            {isStreaming && (
              <span className="ml-0.5 inline-block h-4 w-1 animate-pulse bg-slate-400 dark:bg-slate-500" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
