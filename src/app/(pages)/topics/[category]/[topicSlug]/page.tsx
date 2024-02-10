import TopicDeleteButton from '@/components/topics/topic/TopicDeleteButton'
import TopicLikeButton from '@/components/topics/topic/TopicLikeButton'
import TopicReplies from '@/components/topics/topic/TopicReplies'
import UserBadge from '@/components/ui/badges/UserBadge'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getTopic } from '@/lib/prismaQueries'
import { nowReadable } from '@/lib/utils'
import { TopicType } from '@prisma/client'
import HTMLReactParser from 'html-react-parser'
import { notFound } from 'next/navigation'

export default async function TopicPage({
  params,
}: {
  params: { topicSlug: string; category: TopicType }
}) {
  const topic = await getTopic(params?.topicSlug)

  if (!topic || !Object.values(TopicType).includes(params.category)) {
    notFound()
  }

  const { title, content, topicReplies, topicLikes, user, createdAt, id } =
    topic

  return (
    <>
      <ContentLayout>
        <div className="mb-4 rounded-md border-4 border-black bg-white p-8">
          <div className="flex flex-col gap-2">
            <div>{createdAt && 'Posted ' + nowReadable(createdAt)}</div>
            <div className="text-2xl font-bold text-black">
              <h1>{title}</h1>
            </div>
            <div className="mb-4">{HTMLReactParser(content || '')}</div>

            {user && <UserBadge user={user} />}

            <div className="flex">
              <TopicLikeButton
                likes={topicLikes || []}
                topicId={id}
                category={params.category}
              />
              <TopicDeleteButton
                user={user}
                id={id}
                category={params.category}
              />
            </div>
          </div>
        </div>

        <div>
          <TopicReplies
            replies={topicReplies}
            topicId={id}
            category={params.category}
          />
        </div>
      </ContentLayout>
      <SidebarLayout>
        <></>
      </SidebarLayout>
    </>
  )
}
