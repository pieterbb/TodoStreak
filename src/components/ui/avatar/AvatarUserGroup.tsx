import Link from 'next/link'

import Image from 'next/image'

type User = {
  user: {
    id: string
    name: string
    displayName: string | null
    image: string | null
  }
}

export default function AvatarUserGroup({ users }: { users: User[] }) {
  const uniqueUsers = Array.from(
    new Map(users.map((user) => [user.user.id, user])).values()
  )

  if (!users) return null

  return (
    <>
      <div className=" flex -space-x-4 hover:-space-x-2 ">
        {uniqueUsers.slice(0, 5).map((item) => {
          if (!item?.user?.image) return null
          return (
            <Link key={item.user.name} href={`/${item.user.name}`}>
              <Image
                alt="profile picture"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-800"
                style={{ objectFit: 'cover' }}
                src={item.user.image}
              />
            </Link>
          )
        })}

        {users.length > 5 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs dark:border-gray-800">
            <p className="text-center">{users.length - 5}</p>
          </div>
        )}
      </div>
    </>
  )
}
