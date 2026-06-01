interface Project {
  name: string
  insight: string
  image: string
  githubUrl: string
}

const PROJECTS: Project[] = [
  {
    name: '个人品牌网站',
    insight: 'React 19 + TypeScript + Tailwind CSS 构建的科技感个人展示站，支持亮暗切换与粒子背景动效。',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs><rect fill="url(#g)" width="800" height="450"/><text x="400" y="225" text-anchor="middle" dominant-baseline="central" font-family="system-ui" font-size="36" font-weight="700" fill="white">个人品牌网站</text></svg>'
      ),
    githubUrl: 'https://github.com',
  },
  {
    name: '智能问答引擎',
    insight: '基于 RAG 架构的企业级知识库问答系统，支持多轮对话、文档溯源与置信度评分。',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0891b2"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><rect fill="url(#g)" width="800" height="450"/><text x="400" y="225" text-anchor="middle" dominant-baseline="central" font-family="system-ui" font-size="36" font-weight="700" fill="white">智能问答引擎</text></svg>'
      ),
    githubUrl: 'https://github.com',
  },
  {
    name: '数据可视化仪表盘',
    insight: '实时数据监控面板，集成 WebSocket 推送与 ECharts 图表，支持多维交叉筛选与导出。',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#10b981"/></linearGradient></defs><rect fill="url(#g)" width="800" height="450"/><text x="400" y="225" text-anchor="middle" dominant-baseline="central" font-family="system-ui" font-size="36" font-weight="700" fill="white">数据可视化仪表盘</text></svg>'
      ),
    githubUrl: 'https://github.com',
  },
  {
    name: '微服务网关',
    insight: '基于 Go 开发的高性能 API 网关，支持限流、熔断、路由分发与动态配置热更新。',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#d97706"/><stop offset="100%" stop-color="#f59e0b"/></linearGradient></defs><rect fill="url(#g)" width="800" height="450"/><text x="400" y="225" text-anchor="middle" dominant-baseline="central" font-family="system-ui" font-size="36" font-weight="700" fill="white">微服务网关</text></svg>'
      ),
    githubUrl: 'https://github.com',
  },
]

export type { Project }
export { PROJECTS }
