import { useState, useEffect, useCallback } from 'react'

interface NavbarProps {
  theme: 'light' | 'dark'
  children?: React.ReactNode
}

const NAV_ITEMS = [
  { label: '首页', sectionId: 'hero' },
  { label: '项目', sectionId: 'projects' },
  { label: '联系我', sectionId: 'contact' },
]

const Navbar = ({ theme, children }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }, [])

  const isDark = theme === 'dark'

  const linkClass = isScrolled
    ? isDark
      ? 'text-slate-200'
      : 'text-slate-700'
    : isDark
      ? 'text-white'
      : 'text-slate-900'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-white/70 shadow-sm dark:bg-slate-900/70'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          张老师
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 focus-visible:outline-none dark:hover:text-cyan-400 ${linkClass}`}
            >
              {item.label}
            </button>
          ))}
          {children}
        </div>

        {/* Mobile: hamburger + theme toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {children}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={isOpen}
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-slate-900 transition-colors hover:bg-white/20 focus-visible:outline-none dark:text-white"
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-white/20 focus-visible:outline-none ${linkClass}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
