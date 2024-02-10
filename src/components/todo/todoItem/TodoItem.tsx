import TodoLikeButton from '@/components/todo/todoItem/TodoLikeButton'
import TodoReply from '@/components/todo/todoItem/TodoReply'
import TodoSubmitReply from '@/components/todo/todoItem/TodoSubmitReply'
import Box from '@/components/ui/Box'
import UserBadge from '@/components/ui/badges/UserBadge'
import { useDeleteTodo } from '@/hooks/react-query/useDeleteTodo'
import { useTodoDone } from '@/hooks/react-query/useTodoDone'
import { useTodoPending } from '@/hooks/react-query/useTodoPending'
import { useIsAuthor } from '@/hooks/util/useIsAuthor'
import { nowReadable } from '@/lib/utils'
import { todoItem } from '@/types/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Project = {
  hashtag: string
  slug: string
  avatar?: string | null
}

const parseHashtags = (content: string, projects: Project[]) => {
  const words = content.split(' ')
  return words.map((word, index) => {
    if (word.startsWith('#')) {
      const hashtagName = word.substring(1)
      const project = projects.find(
        (project) => project.hashtag === hashtagName
      )
      if (project) {
        return (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="mx-1 inline-flex h-full w-max items-center gap-1 rounded-sm border border-blue-200 bg-blue-100 p-0.5 text-sm text-gray-700"
          >
            {project?.avatar && (
              <Image
                className="rounded-sm"
                src={project.avatar}
                alt={'project avatar'}
                width={16}
                height={16}
              />
            )}
            <p className=" ">{word}</p>
          </Link>
        )
      }
    }
    return `${word} `
  })
}

export default function TodoItem({ item }: { item: todoItem }) {
  const {
    content,
    createdAt,
    user,
    done,
    userId,
    id,
    attachments,
    todoReplies,
    todoLikes,
    projects,
  } = item
  const { data: session } = useSession()
  const [showReplies, setShowReplies] = useState(false)
  const [isDone, setIsDone] = useState(done)

  const isAuthor = useIsAuthor(userId)
  const todoDone = useTodoDone()
  const todoPending = useTodoPending()
  const deleteTodo = useDeleteTodo()

  // Change todo status
  const handleTodoStatus = async () => {
    if (!isAuthor) return
    if (!isDone) {
      todoDone.mutate({ todoId: id })
      setIsDone(true)
    } else if (isDone) {
      todoPending.mutate({ todoId: id })
      setIsDone(false)
    }
  }

  const handleReplyButton = async () => {
    setShowReplies(!showReplies)
  }

  const parsedContent = parseHashtags(content, projects)

  return (
    <div key={id}>
      <Box>
        <div className="mb-4 space-y-4 px-8 py-4">
          <UserBadge user={user} />
          <div className=" flex items-center space-x-2">
            <input
              className="h-6 w-6 flex-none checked:bg-blue-400"
              type="checkbox"
              checked={isDone}
              onChange={handleTodoStatus}
              name=""
              id=""
            />
            <div className="break-all text-lg text-gray-800	">
              {parsedContent}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {attachments.map((attachment) => {
              return (
                <a
                  key={attachment.url}
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    alt="attachment"
                    src={attachment.url}
                    width={100}
                    height={100}
                    className="h-auto w-full rounded-lg"
                  />
                </a>
              )
            })}
          </div>

          <div className="flex flex-wrap items-stretch ">
            <div className="flex grow items-center space-x-2">
              {(session || todoLikes?.length > 0) && (
                <TodoLikeButton likes={todoLikes} todoId={id} />
              )}
              {(session || todoReplies?.length > 0) && (
                <button
                  onClick={handleReplyButton}
                  className="inline-block h-8 cursor-pointer whitespace-nowrap rounded-full border fill-slate-900 px-3 py-1 hover:bg-slate-100 hover:fill-red-500"
                >
                  {todoReplies?.length > 0
                    ? `Replies ${todoReplies?.length}`
                    : 'Reply'}
                </button>
              )}
              {isAuthor && (
                <button
                  onClick={() => deleteTodo.mutate({ todoId: id })}
                  className="h-8 cursor-pointer rounded-full border fill-slate-900 px-3 py-1 hover:bg-slate-100 hover:fill-red-500"
                >
                  Delete
                </button>
              )}
            </div>

            <p className="my-2 md:mt-0">{`${nowReadable(
              new Date(createdAt)
            )}`}</p>
          </div>

          {showReplies && (
            <div>
              <div>
                {todoReplies.map((reply) => {
                  return <TodoReply key={reply.id} reply={reply} />
                })}
              </div>
              <TodoSubmitReply todoId={id} />
            </div>
          )}
        </div>
      </Box>
    </div>
  )
}
