interface PlaceholderPageProps {
  title: string
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="text-center">
      <div className="mb-4 text-5xl">🚧</div>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
        功能开发中，敬请期待
      </p>
    </div>
  </div>
)

export default PlaceholderPage
