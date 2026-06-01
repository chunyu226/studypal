import useTheme from './hooks/useTheme'
import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import AboutSection from './components/AboutSection'

const PlaceholderSection = ({ id, title }: { id: string; title: string }) => (
  <section
    id={id}
    className="flex min-h-screen scroll-mt-20 items-center justify-center bg-[linear-gradient(180deg,var(--gradient-from),var(--gradient-to))] transition-[background] duration-300"
  >
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-4 text-slate-500 dark:text-slate-400">内容即将上线，敬请期待。</p>
    </div>
  </section>
)

const App = () => {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme}>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </Navbar>

      <main>
        <Hero theme={theme} />
        <ProjectShowcase />
        <AboutSection />
        <PlaceholderSection id="contact" title="联系我" />
      </main>
    </>
  )
}

export default App
