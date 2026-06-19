import Link from 'next/link'
import {defineQuery} from 'next-sanity'
import {BlogSearch} from '@/components/blog-search'
import {formatDate} from '@/lib/portable-text'
import {sanityFetch} from '@/sanity/lib/live'
import type {SearchResult} from '@/sanity/queries/search'

const SEARCH_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && (
      title match $search
      || pt::text(body) match $search
      || author->name match $search
    )
  ] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    "excerpt": coalesce(
      array::join(string::split(pt::text(body), " ")[0..28], " ") + "...",
      ""
    ),
    author->{
      name
    }
  }
`)

type Props = {
  searchParams: Promise<{q?: string}>
}

export async function generateMetadata({searchParams}: Props) {
  const {q} = await searchParams
  return {
    title: q ? `Search: ${q}` : 'Search',
  }
}

export default async function SearchPage({searchParams}: Props) {
  const {q = ''} = await searchParams
  const trimmed = q.trim()
  let results: SearchResult[] = []

  if (trimmed.length >= 2) {
    const {data} = await sanityFetch({
      query: SEARCH_POSTS_QUERY,
      params: {search: `*${trimmed.replace(/[^\w\s-]/g, '')}*`},
      stega: false,
    })
    results = (data ?? []) as SearchResult[]
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Search</h1>
      <p className="mt-2 text-zinc-600">Find articles across the Bruno Blog.</p>

      <div className="mt-8">
        <BlogSearch
          variant="hero"
          placeholder="Search Bruno Blog"
          initialQuery={trimmed}
        />
      </div>

      {trimmed && (
        <section className="mt-10">
          <p className="text-sm text-zinc-500">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;
            {trimmed}&rdquo;
          </p>

          {results.length > 0 ? (
            <ul className="mt-6 divide-y divide-zinc-200">
              {results.map((result) => (
                <li key={result._id} className="py-6">
                  <Link
                    href={`/${result.slug.current}`}
                    className="group block"
                  >
                    <h2 className="text-xl font-semibold text-zinc-900 transition group-hover:text-[#ea580c]">
                      {result.title}
                    </h2>
                    {result.excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {result.excerpt}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-zinc-500">
                      {result.author?.name && `${result.author.name} · `}
                      {formatDate(result.publishedAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : trimmed.length >= 2 ? (
            <p className="mt-6 text-zinc-600">No posts matched your search.</p>
          ) : (
            <p className="mt-6 text-zinc-600">
              Type at least 2 characters to search.
            </p>
          )}
        </section>
      )}
    </main>
  )
}
