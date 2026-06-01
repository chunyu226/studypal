import { useState } from 'react'
import type { TrendPoint } from '../data/dashboard'

interface TrendChartProps {
  weekly: TrendPoint[]
  monthly: TrendPoint[]
}

const W = 600
const H = 200
const PAD_L = 40
const PAD_R = 16
const PAD_T = 16
const PAD_B = 28

const TrendChart = ({ weekly, monthly }: TrendChartProps) => {
  const [tab, setTab] = useState<'week' | 'month'>('week')
  const data = tab === 'week' ? weekly : monthly

  const maxVal = Math.max(...data.map((d) => d.value), 1)
  const cx = PAD_L
  const cy = H - PAD_B
  const cw = W - PAD_L - PAD_R
  const ch = H - PAD_T - PAD_B

  const points = data.map((d, i) => {
    const x = cx + (i / Math.max(data.length - 1, 1)) * cw
    const y = cy - (d.value / maxVal) * ch
    return { x, y }
  })

  const pathLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const pathFill =
    pathLine + ` L${points[points.length - 1].x},${cy} L${points[0].x},${cy} Z`

  const yTicks = 4
  const xLabelGap = data.length > 7 ? Math.ceil(data.length / 5) : 1

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        {(['week', 'month'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              tab === t
                ? 'bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
            }`}
          >
            {t === 'week' ? '周' : '月'}
          </button>
        ))}
      </div>

      {/* Chart */}
      {data.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
          暂无数据
        </div>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="学习趋势图">
          {/* Grid lines */}
          {Array.from({ length: yTicks }, (_, i) => {
            const y = cy - (i / (yTicks - 1)) * ch
            const val = Math.round((i / (yTicks - 1)) * maxVal)
            return (
              <g key={i}>
                <line
                  x1={cx}
                  y1={y}
                  x2={W - PAD_R}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-700"
                  strokeWidth="0.5"
                />
                <text
                  x={cx - 6}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] dark:fill-slate-500"
                >
                  {val}h
                </text>
              </g>
            )
          })}

          {/* Fill area */}
          <path d={pathFill} className="fill-indigo-100 dark:fill-cyan-900/30" />

          {/* Line */}
          <path
            d={pathLine}
            fill="none"
            className="stroke-indigo-500 dark:stroke-cyan-400"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels */}
          {data.map((d, i) => {
            if (i % xLabelGap !== 0 && i !== data.length - 1) return null
            const x = cx + (i / Math.max(data.length - 1, 1)) * cw
            return (
              <text
                key={i}
                x={x}
                y={H - 4}
                textAnchor="middle"
                className="fill-slate-400 text-[10px] dark:fill-slate-500"
              >
                {d.date}
              </text>
            )
          })}

          {/* Dots */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              className="fill-white stroke-indigo-500 dark:fill-slate-800 dark:stroke-cyan-400"
              strokeWidth="2"
            />
          ))}
        </svg>
      )}
    </div>
  )
}

export default TrendChart
