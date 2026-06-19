import {defineQuery} from 'next-sanity'
import {FeaturedPost} from '@/components/featured-post'
import {PostCard, type PostCardData} from '@/components/post-card'
import {sanityFetch} from '@/sanity/lib/live'

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  "excerpt": coalesce(
    array::join(string::split(pt::text(body), " ")[0..28], " ") + "...",
    ""
  ),
  author->{
    name,
    image
  }
}`)

export default async function IndexPage() {
  const {data} = await sanityFetch({
    query: POSTS_QUERY,
  })
  const posts = (data ?? []) as PostCardData[]
  const [featuredPost, ...otherPosts] = posts

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          The Bruno Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Your home for API resources, updates, and community news.
        </p>
      </section>

      {featuredPost && (
        <section className="mb-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {otherPosts.length > 0 && (
        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-zinc-900">More from the blog</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {otherPosts.map((post) => (
              <PostCard key={post.slug.current} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
          <p className="text-lg font-medium text-zinc-900">No posts yet</p>
          <p className="mt-2 text-zinc-600">
            Create your first post in Sanity Studio to see it here.
          </p>
        </div>
      )}
    </main>
  )
}
