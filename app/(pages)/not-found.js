import Link from 'next/link'

export default function NotFound() {
  // + By default, not-found is a Server Component. You can mark it as async to fetch and display data:
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}