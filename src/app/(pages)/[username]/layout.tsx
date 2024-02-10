import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ParamPillLink from '@/components/profile/ParamPillLink'
import ProfileBox from '@/components/profile/ProfileBox'
import AddProjectOrQuestionWidget from '@/components/widgets/AddProjectOrQuestionWidget'
import MediaBanner from '@/components/widgets/MediaWidget'
import UserProjectsBanner from '@/components/widgets/UserProjectsWidget'
import ContentLayout from '@/layouts/ContentLayout'
import SidebarLayout from '@/layouts/SidebarLayout'
import { getUserDetailsByName } from '@/lib/prismaQueries'
import { calculateLongestStreak, nowReadable } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export default async function UserPageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { username: string }
}) {
  const session = await getServerSession(authOptions)

  const userDetails = await getUserDetailsByName(
    decodeURIComponent(params?.username)
  )

  if (!userDetails) {
    notFound()
  }

  const isOwnProfilePage = session?.user?.id === userDetails?.id
  const longestStreak = calculateLongestStreak(userDetails?.todos)

  return (
    <>
      <ContentLayout>
        <div>
          <ProfileBox
            profileBanner={userDetails.profileBanner || ''}
            avatar={userDetails.image || ''}
            title={userDetails.displayName || ''}
            tag={userDetails?.name || ''}
            bio={userDetails?.bio || ''}
            ownerId={userDetails?.id}
            editLink={`/settings`}
            displayEditLink={isOwnProfilePage}
          >
            {/* Custom badges which differ from users and projects */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center space-x-2 text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>{longestStreak}</div>
              </div>
              {userDetails.location && (
                <div className="flex items-center justify-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="rounded-full bg-orange-50 px-2 capitalize text-orange-800/70">
                    {userDetails.location}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>{`Joined ${nowReadable(userDetails?.createdAt)}`}</div>
              </div>
            </div>
          </ProfileBox>

          <div className="my-4 flex justify-center space-x-2 overflow-x-auto">
            <ParamPillLink slug={`/${params.username}/done`} text={'Done'} />
            <ParamPillLink
              slug={`/${params.username}/pending`}
              text={'Pending'}
            />
            <ParamPillLink
              slug={`/${params.username}/projects`}
              text={'Projects'}
            />
          </div>
          {children}
        </div>
      </ContentLayout>
      <SidebarLayout>
        <div>
          {session && isOwnProfilePage && (
            <>
              <AddProjectOrQuestionWidget />
              {userDetails?.projects?.length > 0 ? (
                <UserProjectsBanner projects={userDetails.projects} />
              ) : null}
            </>
          )}
          {userDetails.todos?.some((todo) => todo?.attachments?.length > 0) ? (
            <MediaBanner
              imageURLs={userDetails.todos.reduce((acc: string[], todo) => {
                if (todo.attachments) {
                  const urls = todo.attachments.map(
                    (attachment) => attachment.url
                  )
                  return [...acc, ...urls]
                }
                return acc
              }, [])}
            />
          ) : null}
        </div>
      </SidebarLayout>
    </>
  )
}
