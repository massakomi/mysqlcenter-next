// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  let posts = await fetch('https://api.vercel.app/blog').then((res) => res.json());
  console.log(posts)
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Page({ params }) {
  let post = await fetch(`https://api.vercel.app/blog/1`).then((res) => res.json());
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <hr />
      <AllPosts />
    </main>
  );
}

async function AllPosts() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}