import Link from 'next/link'
import {BlogSearch} from '@/components/blog-search'

const navLinks = [
  {label: 'Website', href: 'https://www.usebruno.com/'},
  {label: 'Blog', href: '/'},
  {label: 'Docs', href: 'https://docs.usebruno.com/'},
  {label: 'Pricing', href: 'https://www.usebruno.com/pricing'},
  {label: 'Bruno Vs Postman', href: 'https://www.usebruno.com/compare/bruno-vs-postman'},
  {label: 'Studio', href: '/studio'},
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6 lg:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold text-zinc-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f97316] text-sm font-bold text-white">
            B
          </span>
          <span className="hidden sm:inline">Bruno</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) =>
            link.href.startsWith('http') ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden min-w-0 flex-1 justify-center md:flex lg:max-w-sm">
          <BlogSearch variant="navbar" placeholder="Search blog" />
        </div>

        <a
          href="https://www.usebruno.com/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Download
        </a>
      </div>
    </header>
  )
}
