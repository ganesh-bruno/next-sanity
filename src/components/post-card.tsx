import Link from 'next/link'
import {formatDate} from '@/lib/portable-text'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url'

export type PostCardData = {
  title: string
  slug: {current: string}
  publishedAt: string
  excerpt?: string | null
  image?: SanityImageSource
  author?: {
    name: string
    image?: SanityImageSource
  } | null
}

export function PostCard({post}: {post: PostCardData}) {
  const imageUrl = post.image
    ? urlFor(post.image)?.width(600).height(340).fit('crop').url()
    : null
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(32).height(32).fit('crop').url()
    : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-sm">
      <Link href={`/${post.slug.current}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/${post.slug.current}`}>
          <h2 className="text-lg font-semibold leading-snug text-zinc-900 transition group-hover:text-[#ea580c]">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          {authorImageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={authorImageUrl}
              alt={post.author?.name ?? 'Author'}
              className="h-8 w-8 rounded-full object-cover"
              width="32"
              height="32"
            />
          )}
          <div className="min-w-0 text-sm">
            {post.author?.name && (
              <p className="truncate font-medium text-zinc-900">{post.author.name}</p>
            )}
            <p className="text-zinc-500">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
