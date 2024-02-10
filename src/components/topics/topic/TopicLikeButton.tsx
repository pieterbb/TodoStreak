'use client'
import LikeButton from '@/components/ui/button/LikeButton'
import { useLikeTopic } from '@/hooks/react-query/useLikeTopic'
import { useUnlikeTopic } from '@/hooks/react-query/useUnlikeTopic'
import { useIsLikedByUser } from '@/hooks/util/useIsLikedByUser'
import { Users } from '@/types/types'
import { TopicType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function TopicLikeButton({
  likes,
  topicId,
  category,
}: {
  likes: Users
  topicId: string
  category: TopicType
}) {
  const { data: session } = useSession()
  const isLikedByUser = useIsLikedByUser(likes)
  const [isLiked, setIsLiked] = useState(isLikedByUser)
  const likeTopic = useLikeTopic()
  const unlikeTopic = useUnlikeTopic()

  const handleTopicLike = async () => {
    if (!session) return

    if (!isLiked) {
      likeTopic.mutate({ topicId, category })
      setIsLiked(true)
    } else if (isLiked) {
      unlikeTopic.mutate({ topicId, category })
      setIsLiked(false)
    }
  }

  return (
    <div>
      <LikeButton
        isLiked={isLiked}
        likes={likes}
        handleLike={handleTopicLike}
      />
    </div>
  )
}
