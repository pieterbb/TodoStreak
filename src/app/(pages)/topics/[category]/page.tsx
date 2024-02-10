import ForumFeedItem from '@/components/topics/TopicFeedItem'
import SearchParamPillLink from '@/components/topics/SearchParamPillLink'
import NoItems from '@/components/ui/NoItems'
import ActionButtonBanner from '@/components/widgets/GenericActionButtonWidget'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { TopicSort, getTopics } from '@/lib/prismaQueries'
import { TopicType } from '@prisma/client'

type Category = 'questions' | 'milestones' | 'roasts'

export default async function Questions({
  params,
  searchParams,
}: {
  params: { category: TopicType }
  searchParams: { sort: TopicSort }
}) {
  const recentTopics = await getTopics(params?.category, searchParams?.sort)

  return (
    <>
      <ContentLayout>
        <div className="my-4 flex justify-center space-x-2 overflow-x-auto">
          <SearchParamPillLink slug={'?sort=newest'} text={'Newest'} />
          <SearchParamPillLink slug={'?sort=unanswered'} text={'Unanswered'} />
          <SearchParamPillLink slug={'?sort=popular'} text={'Popular'} />
        </div>
        <div>
          {recentTopics?.length > 0 ? (
            recentTopics.map((topic) => {
              return (
                <ForumFeedItem
                  topic={topic}
                  category={params.category}
                  key={topic.title}
                />
              )
            })
          ) : (
            <NoItems />
          )}
        </div>
      </ContentLayout>
      <SidebarLayout>
        {renderActionButtonBanner(params?.category)}
      </SidebarLayout>
    </>
  )
}

const renderActionButtonBanner = (category: Category) => {
  switch (category) {
    case 'milestones':
      return (
        <ActionButtonBanner
          buttonText="🚩 Share a Milestone"
          url="/topics/new/?category=milestones"
        />
      )
    case 'roasts':
      return (
        <ActionButtonBanner
          buttonText="🔥 Get Roasted"
          url="/topics/new/?category=roasts"
        />
      )
    case 'questions':
      return (
        <ActionButtonBanner
          buttonText="👉 Ask a question"
          url="/topics/new?category=questions"
        />
      )
    default:
      return
  }
}
