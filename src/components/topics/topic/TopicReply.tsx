import TopicReplyLikeButton from '@/components/topics/topic/TopicReplyLikeButton'
import UserBadge from '@/components/ui/badges/UserBadge'
import { useDeleteTopicReply } from '@/hooks/react-query/useDeleteTopicReply'
import { useIsAuthor } from '@/hooks/util/useIsAuthor'
import { getTopic } from '@/lib/prismaQueries'
import { nowReadable } from '@/lib/utils'
import { TopicType } from '@prisma/client'

export default function TopicReply({
  reply,
  category,
}: {
  category: TopicType
  reply: NonNullable<getTopic>['topicReplies'][0]
}) {
  const { content, createdAt, user, topicId, topicReplyLikes, id } = reply
  const deleteTopicReply = useDeleteTopicReply()
  const isAuthor = useIsAuthor(user.id)

  const handleDeleteTopicReply = async () => {
    deleteTopicReply.mutate({
      topicId: topicId,
      category: category,
      replyId: id,
    })
  }

  return (
    <>
      <div>
        <div className="relative mb-4 w-full space-y-4 rounded-md border bg-white px-8 py-4 shadow-sm">
          <UserBadge user={user} />
          <div>{content}</div>
          <div className="flex grow items-center space-x-4">
            <TopicReplyLikeButton
              likes={topicReplyLikes}
              replyId={id}
              topicId={topicId}
            />
            {isAuthor && (
              <button
                onClick={handleDeleteTopicReply}
                className="cursor-pointer rounded-full border fill-slate-900 px-3 py-1 hover:bg-slate-100 hover:fill-red-500"
              >
                Delete
              </button>
            )}
          </div>
          <div className="flex w-full items-end">
            <p>{nowReadable(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  )
}
