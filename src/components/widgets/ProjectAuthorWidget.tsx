import Box from '@/components/ui/Box'
import UserBadge from '@/components/ui/badges/UserBadge'
import WidgetTitle from '@/components/ui/typography/WidgetTitle'
import { getProjectPageDetails } from '@/lib/prismaQueries'

export default function ProjectAuthorWidget({
  user,
}: {
  user: NonNullable<getProjectPageDetails>['user']
}) {
  return (
    <>
      <Box>
        <div className="mb-4 space-y-2 p-4">
          <WidgetTitle>🙋‍♂️ Project Author</WidgetTitle>
          <UserBadge user={user} />
        </div>
      </Box>
    </>
  )
}
