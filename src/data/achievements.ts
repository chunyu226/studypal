export interface Achievement {
  id: string
  name: string
  icon: string
  description: string
  condition: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-study',
    name: '初入江湖',
    icon: '🏆',
    description: '完成首次学习',
    condition: '有任意学习活动记录',
  },
  {
    id: 'bookworm',
    name: '书虫',
    icon: '📚',
    description: '完成 5 门课程',
    condition: 'completed_courses >= 5',
  },
  {
    id: 'streak-king',
    name: '打卡王者',
    icon: '🔥',
    description: '连续打卡 30 天',
    condition: 'streak_days >= 30',
  },
  {
    id: 'scholar',
    name: '学霸',
    icon: '💯',
    description: '累计学习 100 小时',
    condition: 'total_hours >= 100',
  },
  {
    id: 'fullstack-master',
    name: '全栈大师',
    icon: '🧠',
    description: '完成 20 门课程',
    condition: 'completed_courses >= 20',
  },
  {
    id: 'early-bird',
    name: '早起鸟',
    icon: '🌅',
    description: '早晨学习 10 次',
    condition: 'morning_sessions >= 10',
  },
  {
    id: 'night-owl',
    name: '夜猫子',
    icon: '🌙',
    description: '夜间学习 10 次',
    condition: 'night_sessions >= 10',
  },
  {
    id: 'persistence',
    name: '坚持就是胜利',
    icon: '💪',
    description: '连续打卡 7 天',
    condition: 'streak_days >= 7',
  },
  {
    id: 'explorer',
    name: '知识探索者',
    icon: '🔍',
    description: '使用 AI 助手 50 次',
    condition: 'ai_conversations >= 50',
  },
  {
    id: 'perfect-week',
    name: '完美一周',
    icon: '⭐',
    description: '连续 7 天每天学习 ≥2 小时',
    condition: '7 天 daily_hours >= 2',
  },
]
