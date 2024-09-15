import { revalidateTag } from 'next/cache'

// Справка
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// http://localhost:3000/test/route?tag=xxx
export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  return Response.json({ revalidated: true, now: Date.now(), tag })
}