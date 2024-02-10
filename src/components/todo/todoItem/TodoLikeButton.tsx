import LikeButton from '@/components/ui/button/LikeButton'
import { useLikeTodo } from '@/hooks/react-query/useLikeTodo'
import { useUnlikeTodo } from '@/hooks/react-query/useUnlikeTodo'
import { useIsLikedByUser } from '@/hooks/util/useIsLikedByUser'
import { Users } from '@/types/types'
import { useSession } from 'next-auth/react'

export default function TodoLikeButton({
  likes,
  todoId,
}: {
  likes: Users
  todoId: string
}) {
  const { data: session } = useSession()

  const isLikedByUser = useIsLikedByUser(likes)
  const likeTodo = useLikeTodo()
  const unlikeTodo = useUnlikeTodo()

  const handleTodoLike = async () => {
    if (!session) return
    isLikedByUser ? unlikeTodo.mutate({ todoId }) : likeTodo.mutate({ todoId })
  }

  return (
    <>
      <LikeButton
        isLiked={isLikedByUser}
        likes={likes}
        handleLike={handleTodoLike}
      />
    </>
  )
}
