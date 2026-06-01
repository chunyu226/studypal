import { MOCK_DASHBOARD, type StatItem } from '../data/dashboard'
import TrendChart from './TrendChart'

const ICONS: Record<StatItem['icon'], JSX.Element> = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
      <path d="M12 2a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8a3.5 3.5 0 0 0 3.5-3.5v-1a2 2 0 0 0-2-2h-1a6 6 0 0 1 0-12h1a2 2 0 0 1 2 2v1a3.5 3.5 0 0 1-3.5 3.5" />
      <path d="M12 2a9 9 0 0 1 9 9c0 3.5-2 6.5-5 8a3.5 3.5 0 0 1-3.5-3.5v-1a2 2 0 0 1 2-2h1a6 6 0 0 0 0-12h-1a2 2 0 0 0-2 2v1a3.5 3.5 0 0 0 3.5 3.5" />
    </svg>
  ),
}

const COLORS: Record<StatItem['icon'], string> = {
  clock: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  book: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  flame: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  brain: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
}

const DashboardHome = () => {
  const { stats, dailyGoals, aiSuggestions, weeklyTrend, monthlyTrend } = MOCK_DASHBOARD

  const completedCount = dailyGoals.filter((g) => g.completed).length
  const totalGoals = dailyGoals.length
  const overallProgress = Math.round((completedCount / totalGoals) * 100)

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        学习概览
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group flex flex-col gap-3 rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800"
          >
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${COLORS[stat.icon]}`}
            >
              {ICONS[stat.icon]}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Goals */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            每日目标
          </h2>

          {/* Overall progress */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>今日进度</span>
              <span>
                {completedCount}/{totalGoals} · {overallProgress}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500 dark:bg-cyan-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            {overallProgress === 0 && (
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                今日尚未开始
              </p>
            )}
          </div>

          {/* Goal items */}
          <ul className="space-y-2">
            {dailyGoals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[10px] ${
                    goal.completed
                      ? 'border-indigo-500 bg-indigo-500 text-white dark:border-cyan-500 dark:bg-cyan-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {goal.completed ? '✓' : ''}
                </span>
                <div className="flex flex-1 items-center justify-between gap-2">
                  <span
                    className={`text-sm ${
                      goal.completed
                        ? 'text-slate-400 line-through dark:text-slate-500'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {goal.title}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {goal.progress}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Suggestions */}
        <div className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            AI 学习建议
          </h2>
          <ul className="space-y-3">
            {aiSuggestions.map((s) => (
              <li
                key={s.id}
                className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="mt-0.5 h-full w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-cyan-400" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                      {s.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                      {s.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="rounded-xl border border-slate-200/60 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-800">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          学习趋势
        </h2>
        <TrendChart weekly={weeklyTrend} monthly={monthlyTrend} />
      </div>
    </div>
  )
}

export default DashboardHome
