import LikeButton from '@/components/ui/button/LikeButton'
import { useLikeTopicReply } from '@/hooks/react-query/useLikeTopicReply'
import { useUnlikeTopicReply } from '@/hooks/react-query/useUnlikeTopicReply'
import { useIsLikedByUser } from '@/hooks/util/useIsLikedByUser'
import { Users } from '@/types/types'
import { TopicType } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function TopicReplyLikeButton({
  likes,
  replyId,
  topicId,
}: {
  likes: Users
  replyId: string
  topicId: string
}) {
  const { data: session } = useSession()
  const isLikedByUser = useIsLikedByUser(likes)
  const likeTopicReply = useLikeTopicReply()
  const unlikeTopicReply = useUnlikeTopicReply()

  const searchParams = useSearchParams()
  const category = searchParams.get('category')

const validateCategory = (category: string | null): TopicType | null => {
  if (category && Object.values(TopicType).includes(category as TopicType)) {
    return category as TopicType
  }
  return null
}

const handleTopicReplyLike = async () => {
  const validCategory = validateCategory(category)
  if (!session || !validCategory) return
  isLikedByUser
    ? unlikeTopicReply.mutate({ category: validCategory, topicId, replyId })
    : likeTopicReply.mutate({ category: validCategory, topicId, replyId })
}

  return (
    <div className="h-full">
      <LikeButton
        isLiked={isLikedByUser}
        likes={likes}
        handleLike={handleTopicReplyLike}
      />
    </div>
  )
}
