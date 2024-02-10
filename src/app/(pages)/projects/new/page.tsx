import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NewProjectForm from '@/components/ui/project/NewProjectForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function NewProject() {
  
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }
  return (
    <>
      <ContentLayout>
        <NewProjectForm />
      </ContentLayout>
      <SidebarLayout>
        <></>
      </SidebarLayout>
    </>
  )
}
