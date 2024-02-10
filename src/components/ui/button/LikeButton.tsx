import { cn } from '@/lib/utils'
import { Users } from '@/types/types'
import AvatarUserGroup from '../avatar/AvatarUserGroup'

type LikeButtonProps = {
  isLiked: boolean
  likes: Users
  handleLike: () => Promise<void>
}

export default function LikeButton({
  isLiked,
  likes,
  handleLike,
}: LikeButtonProps) {
  return (
    <div className="flex h-full items-center gap-1">
      <button
        onClick={handleLike}
        className={cn(
          'flex h-8 cursor-pointer items-center space-x-1 rounded-full border px-3 py-1 hover:bg-slate-100',
          isLiked
            ? 'fill-red-500 hover:fill-red-400'
            : 'fill-slate-900 hover:fill-slate-800'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="h-4 w-4"
        >
          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
        </svg>
        <div>{likes?.length || ''}</div>
      </button>
      <AvatarUserGroup users={likes} />
    </div>
  )
}
