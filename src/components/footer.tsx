export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-zinc-900">Bruno Blog</p>
          <p className="mt-1 text-sm text-zinc-500">
            Your home for API resources, updates, and community news.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
          <a href="https://www.usebruno.com/" className="hover:text-zinc-900">
            Website
          </a>
          <a href="https://docs.usebruno.com/" className="hover:text-zinc-900">
            Documentation
          </a>
          <a href="https://www.usebruno.com/pricing" className="hover:text-zinc-900">
            Pricing
          </a>
        </div>
      </div>
    </footer>
  )
}
