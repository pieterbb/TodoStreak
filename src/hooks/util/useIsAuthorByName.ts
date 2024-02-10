import { useEffect, useState } from 'react'

export function useIsAuthorByName(
  sessionUsername: string | undefined,
  username: string
) {
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    if (sessionUsername === username) {
      setIsAuthor(true)
    } else {
      setIsAuthor(false)
    }
  }, [sessionUsername, username])

  return isAuthor
}
