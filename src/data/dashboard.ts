export interface StatItem {
  label: string
  value: string
  icon: 'clock' | 'book' | 'flame' | 'brain'
}

export interface DailyGoal {
  id: string
  title: string
  completed: boolean
  progress: number
}

export interface AISuggestion {
  id: string
  title: string
  description: string
  tag: string
}

export interface TrendPoint {
  date: string
  value: number
}

export interface DashboardData {
  stats: StatItem[]
  dailyGoals: DailyGoal[]
  aiSuggestions: AISuggestion[]
  weeklyTrend: TrendPoint[]
  monthlyTrend: TrendPoint[]
}

export const MOCK_DASHBOARD: DashboardData = {
  stats: [
    { label: '今日学习', value: '2.5h', icon: 'clock' },
    { label: '完成课程', value: '12', icon: 'book' },
    { label: '连续打卡', value: '7天', icon: 'flame' },
    { label: '专注指数', value: '85', icon: 'brain' },
  ],
  dailyGoals: [
    { id: '1', title: '复习线性代数第三章', completed: true, progress: 100 },
    { id: '2', title: '完成 LeetCode 每日一题', completed: true, progress: 100 },
    { id: '3', title: '阅读论文 Attention Is All You Need', completed: false, progress: 60 },
    { id: '4', title: '整理上周课程笔记', completed: false, progress: 30 },
    { id: '5', title: '练习英语听力 30 分钟', completed: false, progress: 0 },
  ],
  aiSuggestions: [
    {
      id: '1',
      title: '建议回顾线性相关概念',
      description: '基于你本周的错题分析，线性相关/无关的判断仍有混淆，建议花 20 分钟重新过一遍定义和例题。',
      tag: '薄弱环节',
    },
    {
      id: '2',
      title: '推荐补充学习资源',
      description: '你在概率论模块表现优异，推荐学习 MIT 6.041 课程的第 8-10 讲来提前接触马尔可夫链。',
      tag: '进阶推荐',
    },
    {
      id: '3',
      title: '调整学习节奏',
      description: '过去三天学习时长呈下降趋势。建议明天设定 3 个 25 分钟的番茄钟，逐步恢复节奏。',
      tag: '习惯养成',
    },
  ],
  weeklyTrend: [
    { date: '周一', value: 3.2 },
    { date: '周二', value: 2.8 },
    { date: '周三', value: 1.5 },
    { date: '周四', value: 2.1 },
    { date: '周五', value: 3.5 },
    { date: '周六', value: 4.0 },
    { date: '周日', value: 2.5 },
  ],
  monthlyTrend: [
    { date: '第1周', value: 18 },
    { date: '第2周', value: 22 },
    { date: '第3周', value: 15 },
    { date: '第4周', value: 20 },
  ],
}
