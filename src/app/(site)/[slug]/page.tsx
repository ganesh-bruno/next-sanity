import Image from 'next/image'
import {notFound} from 'next/navigation'
import {defineQuery, type PortableTextBlock} from 'next-sanity'
import type {SanityImageSource} from '@sanity/image-url'
import {PortableTextContent} from '@/components/portable-text-content'
import {TableOfContents} from '@/components/table-of-contents'
import {extractHeadings, formatDate} from '@/lib/portable-text'
import {sanityFetch} from '@/sanity/lib/live'
import {urlFor} from '@/sanity/lib/image'

const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    image,
    body,
    author->{
      name,
      image
    }
  }
`)

const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`)

type Post = {
  _id: string
  title: string
  publishedAt: string
  image?: SanityImageSource
  body?: PortableTextBlock[]
  author?: {
    name: string
    image?: SanityImageSource
  } | null
}

type PostSlug = {
  slug: string
}

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })

  return (data ?? []) as PostSlug[]
}

export async function generateMetadata({params}: Props) {
  const {data} = await sanityFetch({
    query: POST_QUERY,
    params: await params,
    stega: false,
  })
  const post = data as Post | null
  return {title: post?.title ?? 'Post not found'}
}

export default async function PostPage({params}: Props) {
  const {data} = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  })
  const post = data as Post | null

  if (!post) notFound()

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(675).fit('crop').auto('format').quality(85).url()
    : null

  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image)?.width(80).height(80).fit('crop').auto('format').quality(85).url()
    : null

  const headings = extractHeadings(post.body ?? [])

  return (
    <article className="pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <header className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-5xl md:leading-[1.08]">
                {post.title}
              </h1>

              {(post.author || post.publishedAt) && (
                <div className="mt-8 flex items-center gap-4">
                  {authorImageUrl && post.author && (
                    <Image
                      src={authorImageUrl}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col gap-0.5">
                    {post.author?.name && (
                      <span className="text-base font-medium text-zinc-900">
                        {post.author.name}
                      </span>
                    )}
                    <span className="text-sm text-zinc-500">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </div>
              )}

              {postImageUrl && (
                <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={postImageUrl}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 896px"
                    className="object-cover"
                  />
                </div>
              )}
            </header>

            {Array.isArray(post.body) && post.body.length > 0 && (
              <div className="max-w-3xl pt-12">
                <PortableTextContent value={post.body} />
              </div>
            )}
          </div>

          <TableOfContents headings={headings} />
        </div>
      </div>
    </article>
  )
}
