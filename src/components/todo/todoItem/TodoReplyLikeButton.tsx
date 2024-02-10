import LikeButton from '@/components/ui/button/LikeButton'
import { useLikeReply } from '@/hooks/react-query/useLikeReply'
import { useUnlikeReply } from '@/hooks/react-query/useUnlikeReply'
import { useIsLikedByUser } from '@/hooks/util/useIsLikedByUser'
import { Users } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function TodoReplyLikeButton({
  likes,
  replyId,
  todoId,
}: {
  likes: Users
  replyId: string
  todoId: string
}) {
  const { data: session } = useSession()
  const isLikedByUser = useIsLikedByUser(likes)
  const [isLiked, setIsLiked] = useState(isLikedByUser)
  const likeReply = useLikeReply()
  const unlikeReply = useUnlikeReply()

  const handleReplyLike = async () => {
    if (!session) return

    if (!isLiked) {
      likeReply.mutate({ todoId, replyId })
      setIsLiked(true)
    } else if (isLiked) {
      unlikeReply.mutate({ todoId, replyId })
      setIsLiked(false)
    }
  }
  return (
    <div>
      <LikeButton
        isLiked={isLiked}
        likes={likes}
        handleLike={handleReplyLike}
      />
    </div>
  )
}
