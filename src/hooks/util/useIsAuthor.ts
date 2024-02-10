import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useIsAuthor(authorId: string | undefined) {
  const [isAuthor, setIsAuthor] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (authorId === session?.user?.id) {
      setIsAuthor(true)
    } else {
      setIsAuthor(false)
    }
  }, [session, authorId])

  return isAuthor
}
