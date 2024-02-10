import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NewTopicForm from '@/components/topics/topic/NewTopicForm'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function NewForumPost() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <>
      <ContentLayout>
        <NewTopicForm />
      </ContentLayout>
      <SidebarLayout>
        <></>
      </SidebarLayout>
    </>
  )
}
