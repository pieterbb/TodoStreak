import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen  items-center justify-center ">
      <div className="">
        <h2 className="text-2xl">Page not found</h2>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </div>
  )
}
