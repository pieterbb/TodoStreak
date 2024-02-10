import { Users } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useIsLikedByUser(likes: Users) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)

  // If the current user already liked the post, set liked to true
  useEffect(() => {
    likes?.some((item) => {
      return item.user?.id === session?.user.id
    })
      ? setIsLiked(true)
      : setIsLiked(false)
  }, [likes, session?.user.id])

  return isLiked
}
