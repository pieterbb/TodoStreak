import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SettingsForm from '@/components/settings/SettingsForm'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getLoggedInUserSettingsFromId } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Settings() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  const userSettings = await getLoggedInUserSettingsFromId(session.user?.id)

  return (
    <>
      <ContentLayout>
        <SettingsForm userSettings={userSettings} />
      </ContentLayout>
      <SidebarLayout>
        <></>
      </SidebarLayout>
    </>
  )
}
