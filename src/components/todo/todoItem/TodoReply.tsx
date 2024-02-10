import TodoReplyLikeButton from '@/components/todo/todoItem/TodoReplyLikeButton'
import AvatarUser from '@/components/ui/avatar/AvatarUser'
import { useDeleteTodoReply } from '@/hooks/react-query/useDeleteTodoReply'
import { useIsAuthor } from '@/hooks/util/useIsAuthor'
import { todoReply } from '@/types/types'
import Link from 'next/link'

export default function TodoReply({ reply }: { reply: todoReply }) {
  const { content, user, userId, todoReplyLikes, todoId, id } = reply
  const isAuthor = useIsAuthor(userId)
  const deleteTodoReply = useDeleteTodoReply()

  return (
    <div>
      <div>
        <div className="py-4">
          <div className="flex flex-col space-y-2 py-4 ">
            <div className="flex items-center space-x-2">
              <AvatarUser user={user} />
              <Link href={user.name}>
                <div className="font-bold text-gray-900">
                  {user?.displayName}
                </div>
              </Link>
            </div>
            <p className="break-all">{content}</p>
          </div>
          <div className="flex grow items-center space-x-2">
            <TodoReplyLikeButton
              likes={todoReplyLikes}
              replyId={id}
              todoId={todoId}
            />
            {isAuthor && (
              <button
                onClick={() =>
                  deleteTodoReply.mutate({ todoId: todoId, todoReplyId: id })
                }
                className="cursor-pointer rounded-full border fill-slate-900 px-3 py-1 hover:bg-slate-100 hover:fill-red-500"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
