import { useState } from 'react'

const Avatar = () => {
  const [hasError, setHasError] = useState(false)

  const placeholder = (
    <div className="flex h-48 w-48 items-center justify-center rounded-full border-4 border-indigo-200 bg-slate-200 dark:border-slate-600 dark:bg-slate-700">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="h-32 w-32"
        aria-hidden="true"
      >
        <circle cx="100" cy="75" r="35" fill="#94a3b8" />
        <ellipse cx="100" cy="170" rx="55" ry="45" fill="#94a3b8" />
      </svg>
    </div>
  )

  if (hasError) return placeholder

  return (
    <img
      src="/my-website/images/avatar-placeholder.svg"
      alt="张老师的照片"
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-48 w-48 rounded-full border-4 border-indigo-200 object-cover dark:border-slate-600"
    />
  )
}

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-[linear-gradient(180deg,var(--gradient-from),var(--gradient-to))] px-4 py-16 transition-[background] duration-300 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          关于我
        </h2>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Photo */}
          <div className="flex justify-center">
            <Avatar />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
              我是一名热爱技术的全栈开发者，专注于构建高性能、可维护的 Web
              应用。从大学时期的第一个 Hello World
              起，代码就成为了我与世界对话的语言。
            </p>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
              在过去几年中，我参与了多个企业级项目，涵盖前端架构设计、后端服务开发以及基础设施搭建。我信奉技术服务于业务，始终以用户体验为核心驱动技术选型。
            </p>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
              工作之余，我喜欢探索新技术、撰写技术博客，也会在 GitHub
              上开源一些小工具。我相信持续学习和分享是成长的最佳路径。
            </p>

            {/* Brand tag */}
            <div className="mt-3">
              <span className="inline-block rounded-full bg-indigo-100 px-5 py-1.5 text-sm font-medium text-indigo-700 dark:bg-slate-700 dark:text-cyan-300">
                赋范空间
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
