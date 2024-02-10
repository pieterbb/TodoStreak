import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ParamPillLink from '@/components/profile/ParamPillLink'
import ProfileBox from '@/components/profile/ProfileBox'
import MediaWidget from '@/components/widgets/MediaWidget'
import ProjectAuthorWidget from '@/components/widgets/ProjectAuthorWidget'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getProjectPageDetails } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ProjectPage({
  children,
  params,
}: {
  children: React.ReactNode
  params: { projectSlug: string }
}) {
  const { projectSlug } = params
  const projectPageDetails = await getProjectPageDetails(projectSlug)

  const session = await getServerSession(authOptions)
  const isProjectAuthor = projectPageDetails?.user?.id === session?.user?.id

  if (!projectPageDetails) {
    notFound()
  }

  return (
    <>
      <ContentLayout>
        <ProfileBox
          profileBanner={projectPageDetails?.profileBanner || undefined}
          avatar={projectPageDetails?.avatar || undefined}
          title={projectPageDetails?.name}
          tag={projectPageDetails?.hashtag}
          bio={projectPageDetails?.pitch}
          ownerId={projectPageDetails?.user?.id}
          editLink={`${projectSlug}/edit`}
          displayEditLink={isProjectAuthor}
        >
          {/* Project specific pill buttons below bio */}
          <div className="flex space-x-4">
            <div>
              <div className="flex items-center justify-center space-x-1">
                {projectPageDetails?.website && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    <Link
                      href={projectPageDetails?.website}
                      className="text-gray-800 underline"
                    >
                      {projectPageDetails?.website}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </ProfileBox>

        <div className="my-4 flex justify-center space-x-2 overflow-x-auto">
          <ParamPillLink slug={`/projects/${projectSlug}/done`} text={'Done'} />
          <ParamPillLink
            slug={`/projects/${projectSlug}/pending`}
            text={'Pending'}
          />
        </div>
        {children}
      </ContentLayout>
      <SidebarLayout>
        <>
          <ProjectAuthorWidget user={projectPageDetails?.user} />
          {projectPageDetails.todos?.some(
            (todo) => todo?.attachments?.length > 0
          ) ? (
            <MediaWidget
              imageURLs={projectPageDetails.todos.reduce(
                (acc: string[], todo) => {
                  if (todo.attachments) {
                    const urls = todo.attachments.map(
                      (attachment) => attachment.url
                    )
                    return [...acc, ...urls]
                  }
                  return acc
                },
                []
              )}
            />
          ) : null}
        </>
      </SidebarLayout>
    </>
  )
}
