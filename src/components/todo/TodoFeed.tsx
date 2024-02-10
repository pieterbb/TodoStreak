'use client'

import TodoItem from '@/components/todo/todoItem/TodoItem'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import NoItems from '@/components/ui/NoItems'
import { useInfiniteTodos } from '@/hooks/react-query/useGetInfiniteTodos'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface TodoFeedProps {
  isTodoDoneFilter?: boolean
  userId?: string
  projectId?: string
}

export default function TodoFeed({
  isTodoDoneFilter = true,
  userId = undefined,
  projectId = undefined,
}: TodoFeedProps) {
  const { ref: loadMoreRef, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteTodos(isTodoDoneFilter, userId, projectId)

  // New state variable to track initial loading
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  // Update isLoading state when isFetching changes
  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
    }
  }, [isFetching])

  // Check if there are any items
  const hasItems = data?.pages.some((group) => group?.length > 0)

  // State to track if device is mobile
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )
  // Effect to update isMobile state when window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      ) : hasItems ? (
        <>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map((item) => {
                return <TodoItem key={item.id} item={item} />
              })}
            </React.Fragment>
          ))}
          {isMobile ? (
            <div className="flex items-center justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className={`mb-2 mr-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 ${
                  !hasNextPage || isFetchingNextPage
                    ? 'bg-gray-500 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                    : 'bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                }`}
              >
                Load More
              </button>
            </div>
          ) : (
            <>
              <div className="invisible border" ref={loadMoreRef}></div>
            </>
          )}
          {isFetchingNextPage && hasNextPage && !isMobile ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <NoItems />
      )}
    </>
  )
}
