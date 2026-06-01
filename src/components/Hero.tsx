import ParticleBackground from './ParticleBackground'

interface HeroProps {
  theme: 'light' | 'dark'
}

const Hero = ({ theme }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,var(--gradient-from),var(--gradient-to))] scroll-mt-0 transition-[background] duration-300 supports-[height:100dvh]:min-h-dvh"
    >
      <ParticleBackground theme={theme} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center supports-[height:100dvh]:min-h-dvh">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
          张老师的个人网站
        </h1>

        <p className="mt-4 text-lg text-slate-600 sm:text-xl dark:text-slate-300">
          你的职业 · 你的领域
        </p>

        <p className="mt-6 max-w-lg text-base text-slate-500 leading-relaxed dark:text-slate-400">
          一句话介绍你自己——你是谁，你做什么，为什么这件事对你很重要。
        </p>

        <a
          href="#projects"
          className="mt-10 inline-block rounded-xl bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          查看我的项目
        </a>
      </div>
    </section>
  )
}

export default Hero
