import Link from 'next/link'
import {formatDate} from '@/lib/portable-text'
import {urlFor} from '@/sanity/lib/image'
import type {PostCardData} from './post-card'

export function FeaturedPost({post}: {post: PostCardData}) {
  const imageUrl = post.image
    ? urlFor(post.image)?.width(960).height(640).fit('crop').url()
    : null
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(48).height(48).fit('crop').url()
    : null

  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Featured
            </p>

            <Link href={`/${post.slug.current}`} className="group">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 transition group-hover:text-zinc-600 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {post.title}
              </h1>
            </Link>

            {post.excerpt && (
              <p className="max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-3">
              {authorImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={authorImageUrl}
                  alt={post.author?.name ?? 'Author'}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                  width="44"
                  height="44"
                />
              )}
              <p className="text-sm text-zinc-600">
                {post.author?.name && (
                  <span className="font-medium text-zinc-900">{post.author.name}</span>
                )}
                {post.author?.name && post.publishedAt && (
                  <span className="mx-2 text-zinc-300">·</span>
                )}
                {post.publishedAt && (
                  <span>{formatDate(post.publishedAt)}</span>
                )}
              </p>
            </div>

            <Link
              href={`/${post.slug.current}`}
              className="group/read inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-zinc-900 transition hover:text-zinc-600"
            >
              Read more
              <span aria-hidden className="transition group-hover/read:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <Link
            href={`/${post.slug.current}`}
            className="group relative block overflow-hidden rounded-2xl bg-zinc-200 shadow-sm ring-1 ring-zinc-200"
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={post.title}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center text-zinc-400">
                No image
              </div>
            )}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent p-6 text-xs font-medium uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
              Featured
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
