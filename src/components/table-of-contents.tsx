import type {TocHeading} from '@/lib/portable-text'

export function TableOfContents({headings}: {headings: TocHeading[]}) {
  if (headings.length === 0) return null

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-900">
          In this post
        </h2>
        <nav className="mt-4">
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block text-sm leading-snug text-zinc-600 transition hover:text-[#ea580c] ${
                    heading.level === 3 ? 'pl-4' : heading.level === 4 ? 'pl-8' : ''
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
