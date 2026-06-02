import { useState, useCallback, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

const NAV_ITEMS = [
  { label: '概览', to: '/dashboard', end: true },
  { label: '课程', to: '/dashboard/courses' },
  { label: '笔记', to: '/dashboard/notes' },
  { label: 'AI 建议', to: '/dashboard/ai' },
  { label: '设置', to: '/dashboard/settings' },
]

const DashboardLayout = () => {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const close = useCallback(() => setSidebarOpen(false), [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-700 dark:text-cyan-300'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
    }`

  const sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-700">
        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          StudyPal
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-slate-200 px-3 py-3 dark:border-slate-700">
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-slate-600 dark:text-slate-200">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lv.{user.level} · 🔥 {user.streak_days}天
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <ThemeToggle theme={theme} onToggle={toggle} />
          {user && (
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="rounded px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              退出
            </button>
          )}
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Desktop sidebar */}
      <div className="hidden md:block">{sidebar}</div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Mobile top bar */}
        <div className="flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-800 md:hidden">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? '关闭菜单' : '打开菜单'}
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-1.5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                sidebarOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                sidebarOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                sidebarOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            StudyPal
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
