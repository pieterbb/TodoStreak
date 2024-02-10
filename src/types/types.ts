import { getTodosPrisma } from '@/lib/prismaQueries'
import { TopicType } from '@prisma/client'

export type todoItem = {
  newTodo?: boolean
} & getTodosPrisma[0]

export type todoReply = todoItem['todoReplies'][0]

export type Users = todoItem['todoLikes']

export type User = todoItem['user']

export type Categories = TopicType
