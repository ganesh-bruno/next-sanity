import {NextResponse} from 'next/server'
import {client} from '@/sanity/lib/client'
import {SEARCH_POSTS_QUERY, type SearchResult} from '@/sanity/queries/search'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const q = searchParams.get('q')?.trim() ?? ''
  const limit = Math.min(Number(searchParams.get('limit') ?? 8), 20)

  if (!q) {
    return NextResponse.json({results: [] satisfies SearchResult[]})
  }

  const query = `*${q.replace(/[^\w\s-]/g, '')}*`

  const results = await client.fetch<SearchResult[]>(SEARCH_POSTS_QUERY, {
    search: query,
    limit,
  })

  return NextResponse.json({results: results ?? []})
}
