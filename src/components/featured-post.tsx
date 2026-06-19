import Link from 'next/link'
import {formatDate} from '@/lib/portable-text'
import {urlFor} from '@/sanity/lib/image'
import type {PostCardData} from './post-card'

export function FeaturedPost({post}: {post: PostCardData}) {
  const imageUrl = post.image
    ? urlFor(post.image)?.width(900).height(560).fit('crop').url()
    : null
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(40).height(40).fit('crop').url()
    : null

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <p className="text-sm font-medium uppercase tracking-wide text-[#ea580c]">
            Latest Post
          </p>
          <Link href={`/${post.slug.current}`}>
            <h2 className="text-3xl font-bold leading-tight text-zinc-900 transition hover:text-[#ea580c] lg:text-4xl">
              {post.title}
            </h2>
          </Link>

          {post.excerpt && (
            <p className="text-base leading-relaxed text-zinc-600">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-3">
            {authorImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={authorImageUrl}
                alt={post.author?.name ?? 'Author'}
                className="h-10 w-10 rounded-full object-cover"
                width="40"
                height="40"
              />
            )}
            <div>
              {post.author?.name && (
                <p className="font-medium text-zinc-900">{post.author.name}</p>
              )}
              <p className="text-sm text-zinc-500">{formatDate(post.publishedAt)}</p>
            </div>
          </div>

          <Link
            href={`/${post.slug.current}`}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#ea580c] transition hover:text-[#c2410c]"
          >
            Read more
            <span aria-hidden>→</span>
          </Link>
        </div>

        <Link href={`/${post.slug.current}`} className="relative block min-h-[280px] bg-zinc-100">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center text-zinc-400">
              No image
            </div>
          )}
        </Link>
      </div>
    </section>
  )
}
