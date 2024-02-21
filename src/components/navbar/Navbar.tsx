import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DropdownMenu from '@/components/navbar/DropdownMenu'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="mb-8 flex items-center justify-between gap-2 px-1 pt-2 md:px-8">
      <Link href="/">
        <div className="flex cursor-pointer justify-between space-x-2 align-middle">
          <img className="size-8" src="/logo.svg" alt="me" />
          <div className="text-xl font-bold text-gray-900 ">TodoStreak</div>
        </div>
      </Link>
      {/* <div className="grow">
        <input
        type="text" 
          className="max-w-sm cursor-auto rounded-full border-0 border-gray-200 bg-gray-100 py-1 px-2 focus:outline-none
            focus:ring-1 focus:ring-gray-400 "
          placeholder="Search..."
        />
      </div> */}
      {session ? (
        <DropdownMenu />
      ) : (
        <div className="flex space-x-2 px-4">
          <Link href={'/api/auth/signin'}>
            <button className="h-8 rounded-full bg-gray-200 px-4 py-1 text-xs font-medium text-gray-600 ">
              SIGN IN
            </button>
          </Link>
          <Link href={'/api/auth/signin'}>
            <button className=" h-8 rounded-full bg-green-500  px-4 py-1 text-xs font-medium text-white ">
              JOIN TODOSTREAK
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
