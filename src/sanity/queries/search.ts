import {defineQuery} from 'next-sanity'

export const SEARCH_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && (
      title match $search
      || pt::text(body) match $search
      || author->name match $search
    )
  ] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    "excerpt": coalesce(
      array::join(string::split(pt::text(body), " ")[0..20], " ") + "...",
      ""
    ),
    author->{
      name
    }
  }
`)

export type SearchResult = {
  _id: string
  title: string
  slug: {current: string}
  publishedAt: string
  excerpt?: string | null
  author?: {name: string} | null
}
