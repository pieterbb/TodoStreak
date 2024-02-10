// Data fetching to get default values for EditProjectForm

import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditProjectForm from '@/components/ui/project/EditProjectForm'
import { getProjectBySlug } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth/next'
import { notFound, redirect } from 'next/navigation'

export default async function EditProject({
  params,
}: {
  params: { projectSlug: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  const projectDefaultValues = await getProjectBySlug(params?.projectSlug)

  // Check if project slug exist and user is the owner
  if (
    !projectDefaultValues ||
    session.user.id !== projectDefaultValues?.userId
  ) {
    notFound()
  }

  return (
    <>
      <ContentLayout>
        <EditProjectForm defaultProjectValues={projectDefaultValues} />
      </ContentLayout>
      <SidebarLayout>
        <></>
      </SidebarLayout>
    </>
  )
}
