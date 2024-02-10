import { getDoneTodosPrisma, getUserDetailsByName } from '@/lib/prismaQueries'
import clsx, { ClassValue } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { twMerge } from 'tailwind-merge'

type Todo = {
  updatedAt: Date
  done: boolean
  [key: string]: any
}

export function nowReadable(createdAt: Date): string {
  return `${formatDistanceToNow(createdAt)} ago`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function defaultAvatarUrl(name = ''): string {
  return `https://api.dicebear.com/5.x/thumbs/svg?seed=${name}`
}

export function calculateCurrentStreak(todos: Todo[]): number {
  // get all done todos from user
  const doneTodos = todos?.filter((todo) => todo.done)

  if (!doneTodos || doneTodos.length === 0) {
    return 0
  }

  // TODO: Enable this to display current streak not highest streak

  // Check if the last todo was done more than 24 hours ago
  // const lastTodo = doneTodos[doneTodos.length - 1]
  // const now = new Date().getTime()
  // const lastTodoTime = new Date(lastTodo.updatedAt).getTime()
  // if (now - lastTodoTime > 86400000) {
  //   return 0
  // }

  // Calculate streak from done todos by sorting them by date and calculating streak from the difference between the dates
  const uniqueDates = doneTodos
    .map((todo: Todo) => {
      const date = new Date(todo.updatedAt)
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime()
    })
    .filter(
      (date: number, index: number, self: number[]) =>
        self.indexOf(date) === index
    )
    .sort((a: number, b: number) => a - b)

  const currentStreak = uniqueDates.reduce(
    (
      acc: { longestStreak: number; currentStreak: number },
      date: number,
      index: number,
      arr: number[]
    ) => {
      if (index === 0) {
        acc.currentStreak = 1
      } else {
        const diff = date - arr[index - 1]
        if (diff <= 86400000) {
          acc.currentStreak += 1
        } else {
          acc.currentStreak = 1
        }
      }
      return acc
    },
    { longestStreak: 0, currentStreak: 0 }
  ).currentStreak
  return currentStreak
}

export function calculateLongestStreak(
  todos: NonNullable<getUserDetailsByName>['todos'] | undefined
): number {
  // get all done todos from user
  const doneTodos = todos?.filter((todo) => todo.done)

  if (!doneTodos || doneTodos.length === 0) {
    return 0
  }

  // Calculate streak from done todos by sorting them by date and calculating streak from the difference between the dates
  const uniqueDates = doneTodos
    .map((todo) => {
      const date = new Date(todo.updatedAt)
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime()
    })
    .filter((date, index, self) => self.indexOf(date) === index)
    .sort((a, b) => a - b)

  const longestStreak = uniqueDates.reduce(
    (acc, date, index, arr) => {
      if (index === 0) {
        acc.currentStreak = 1
      } else {
        const diff = date - arr[index - 1]
        if (diff <= 86400000) {
          acc.currentStreak += 1
        } else {
          acc.currentStreak = 1
        }
      }
      acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak)
      return acc
    },
    { longestStreak: 0, currentStreak: 0 }
  ).longestStreak

  return longestStreak
}

export const calculateStreaksLeaderboard = (doneTodos: getDoneTodosPrisma) => {
  if (!doneTodos) {
    return []
  }

  // Step 2: Group the todos by user using a Map
  const userTodosMap = new Map()
  doneTodos.forEach((todo) => {
    if (!userTodosMap.has(todo.userId)) {
      userTodosMap.set(todo.userId, [])
    }
    userTodosMap.get(todo.userId).push(todo)
  })

  // Step 3: Calculate the streaks for each user and store them in an array
  const userStreaks = []
  for (const [userId, todos] of userTodosMap.entries()) {
    const user = todos[0].user
    const streak = calculateCurrentStreak(todos)
    if (streak > 0) {
      // Only push users with a streak greater than 0
      userStreaks.push({ user, streak })
    }
  }

  return userStreaks.sort((a, b) => b.streak - a.streak)
}
