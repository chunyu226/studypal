import { useState } from 'react'
import { PROJECTS, type Project } from '../data/projects'

const CardImage = ({ project }: { project: Project }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex h-48 items-center justify-center rounded-t-xl bg-slate-200 dark:bg-slate-700">
        <span className="text-sm text-slate-400 dark:text-slate-500">
          {project.name}
        </span>
      </div>
    )
  }

  return (
    <img
      src={project.image}
      alt={project.name}
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-48 w-full rounded-t-xl object-cover"
    />
  )
}

const ProjectShowcase = () => {
  return (
    <section
      id="projects"
      className="bg-[linear-gradient(180deg,var(--gradient-from),var(--gradient-to))] px-4 py-16 transition-[background] duration-300 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          我的项目
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800"
            >
              <CardImage project={project} />

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.insight}
                </p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase
