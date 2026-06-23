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
    <>
      {featuredPost && <FeaturedPost post={featuredPost} />}

      <main className="mx-auto max-w-7xl px-6 py-12">
        {otherPosts.length > 0 && (
          <section>
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900">
              All Posts
            </h2>
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
    </>
  )
}
