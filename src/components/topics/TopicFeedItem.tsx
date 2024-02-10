import Box from '@/components/ui/Box'
import AvatarUserGroup from '@/components/ui/avatar/AvatarUserGroup'
import { getTopics } from '@/lib/prismaQueries'
import { TopicType } from '@prisma/client'
import Link from 'next/link'

const badge = (category: string) => {
  switch (category) {
    case 'milestones':
      return (
        <div className="my-auto inline-block rounded-sm bg-green-300">
          <div className="p-1 text-xs font-bold text-gray-800">MILESTONE</div>
        </div>
      )
    case 'roasts':
      return (
        <div className="my-auto inline-block rounded-sm bg-orange-200">
          <div className="p-1 text-xs font-bold text-red-500">ROAST</div>
        </div>
      )
    default:
      return
  }
}

export default function ForumFeedItem({
  topic,
  category,
}: {
  topic: getTopics[0]
  category: TopicType
}) {
  const { title, topicReplies, slug } = topic

  return (
    <Box>
      <div className="p-4">
        <Link href={`/topics/${category}/${slug}`}>
          <div className="mb-2 flex gap-2 text-lg font-bold text-gray-800">
            {badge(category)}
            <div className="hover:underline">{title}</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4">
            <svg
              className="stroke-gray-900"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                stroke=""
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="m19.707 6.747a9.1 9.1 0 1 0 -16.285 7.891l-2.672 5.612 5.612-2.672a9.079 9.079 0 0 0 3.388 1.263" />
                <path d="m6.75 6.75h7.5" />
                <path d="m6.75 11.25h3" />
                <path d="m17.882 10.5a5.344 5.344 0 0 1 4.026 8.886l.671 3.864-3.5-2.158a5.364 5.364 0 1 1 -1.2-10.592z" />
                <path d="m19.5 14.25h-3" />
                <path d="m19.5 17.25h-3" />
              </g>
            </svg>
          </div>
          <AvatarUserGroup
            users={topicReplies.map((reply) => ({ user: reply.user }))}
          />
          <div>
            {topicReplies?.length > 0
              ? topicReplies.length === 1
                ? `${topicReplies.length} Reply`
                : `${topicReplies.length} Replies`
              : 'Be the first to reply'}
          </div>
        </div>
      </div>
    </Box>
  )
}
