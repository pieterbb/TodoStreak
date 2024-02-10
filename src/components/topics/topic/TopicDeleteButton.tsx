'use client'
import { useDeleteTopic } from '@/hooks/react-query/useDeleteTopic'
import { useIsAuthor } from '@/hooks/util/useIsAuthor'
import { TopicType } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function TopicDeleteButton({
  user,
  id,
  category,
}: {
  user: any
  id: string
  category: TopicType
}) {
  const deleteTopic = useDeleteTopic()
  const isAuthor = useIsAuthor(user?.id)
  const router = useRouter()

  const handleDeleteTopic = () => {
    deleteTopic.mutate(
      {
        topicId: id,
        category: category,
      },
      {
        onSuccess: () => {
          router.push(`/topics/${category}/`)
          router.refresh()
        },
      }
    )
  }

  return (
    <>
      {isAuthor && (
        <button
          onClick={handleDeleteTopic}
          className="cursor-pointer rounded-full border fill-slate-900 px-3 py-1 hover:bg-slate-100 hover:fill-red-500"
        >
          Delete
        </button>
      )}
    </>
  )
}
