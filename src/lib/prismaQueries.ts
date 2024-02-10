import { ProjectStatus, TopicType } from '@prisma/client'
import { convert } from 'url-slug'
import prisma from './prismaClient'

export const createTodoItem = async (
  content: string,
  done: boolean,
  userId: string,
  attachments: string[] = [],
  projectId?: string
) => {
  return await prisma.todos.create({
    data: {
      content,
      done,
      completedAt: done ? new Date() : null,
      user: {
        connect: { id: userId },
      },
      attachments: {
        createMany: {
          data: attachments.map((url) => ({
            url,
            userId,
            type: 'image',
          })),
        },
      },
      projects: projectId
        ? {
            connect: { id: projectId },
          }
        : undefined,
    },
  })
}

export const likeTodo = async (todoId: string, userId: string) => {
  return await prisma.todoLikes.create({
    data: {
      todoId: todoId,
      userId: userId,
    },
  })
}

export const unlikeTodo = async (todoId: string, userId: string) => {
  return await prisma.todoLikes.delete({
    where: {
      userId_todoId: {
        todoId: todoId,
        userId: userId,
      },
    },
  })
}

export const deleteTodoItem = async (todoId: string, userId: string) => {
  return await prisma.todos.deleteMany({
    where: {
      AND: [{ id: todoId }, { userId: userId }],
    },
  })
}

export type setTodoStatusDone = ReturnType<
  typeof setTodoStatusDone
> extends Promise<infer T>
  ? T
  : never
export const setTodoStatusDone = async (todoId: string, userId: string) => {
  return await prisma.todos.updateMany({
    where: {
      AND: [{ id: todoId }, { userId: userId }],
    },
    data: {
      done: true,
    },
  })
}

export const setTodoStatusPending = async (todoId: string, userId: string) => {
  return await prisma.todos.updateMany({
    where: {
      AND: [{ id: todoId }, { userId: userId }],
    },
    data: {
      done: false,
    },
  })
}

export const createReply = async (
  content: string,
  todoId: string,
  userId: string
) => {
  return await prisma.todoReplies.create({
    data: {
      content: content,
      userId: userId,
      todoId: todoId,
    },
  })
}

export const deleteReply = async (replyId: string, userId: string) => {
  return await prisma.todoReplies.deleteMany({
    where: {
      AND: [{ id: replyId }, { userId: userId }],
    },
  })
}

export const likeReply = async (replyId: string, userId: string) => {
  return await prisma.todoReplyLikes.create({
    data: {
      replyId: replyId,
      userId: userId,
    },
  })
}

export const unlikeReply = async (replyId: string, userId: string) => {
  return await prisma.todoReplyLikes.delete({
    where: {
      userId_replyId: {
        replyId: replyId,
        userId: userId,
      },
    },
  })
}

export type getDoneTodosPrisma = ReturnType<
  typeof getDoneTodosPrisma
> extends Promise<infer T>
  ? T
  : never

export const getDoneTodosPrisma = async () => {
  return await prisma.todos.findMany({
    where: {
      done: true,
    },
    select: {
      id: true,
      userId: true,
      content: true,
      done: true,
      createdAt: true,
      updatedAt: true,
      attachments: true,
      todoReplies: {
        select: {
          id: true,
          userId: true,
          content: true,
          todoReplyLikes: {
            select: {
              user: true,
            },
          },
          todoId: true,
          user: { select: { name: true, displayName: true, image: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
      todoLikes: {
        select: {
          user: true,
        },
      },
      user: {
        select: {
          name: true,
          displayName: true,
          image: true,
          id: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export type getTodosPrisma = ReturnType<typeof getTodosPrisma> extends Promise<
  infer T
>
  ? T
  : never

export const getTodosPrisma = async (
  cursorObj: { id: string } | undefined,
  isTodoDoneFilter = true,
  userId: string | undefined = undefined,
  projectId: string | undefined = undefined
) => {
  return await prisma.todos.findMany({
    take: 5,
    skip: cursorObj ? 1 : 0, // Skip the cursor
    cursor: cursorObj,
    where: {
      done: isTodoDoneFilter,
      ...(userId !== undefined && { userId: userId }),
      ...(projectId !== undefined && {
        projects: {
          some: {
            id: projectId,
          },
        },
      }),
    },
    select: {
      id: true,
      userId: true,
      content: true,
      done: true,
      createdAt: true,
      updatedAt: true,
      attachments: true,
      todoReplies: {
        select: {
          id: true,
          userId: true,
          content: true,
          todoReplyLikes: {
            select: {
              user: true,
            },
          },
          todoId: true,
          user: {
            select: { id: true, name: true, displayName: true, image: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
      todoLikes: {
        select: {
          user: true,
        },
      },
      projects: {
        select: {
          id: true,
          hashtag: true,
          slug: true,
          avatar: true,
        },
      },
      user: {
        select: {
          name: true,
          displayName: true,
          image: true,
          id: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export type TopicSort = 'popular' | 'unanswered' | 'newest'

const getTopicSortCriteria = (sort: TopicSort) => {
  switch (sort) {
    case 'popular':
      return [
        {
          topicReplies: {
            _count: 'desc',
          },
        },
        {
          createdAt: 'desc',
        },
      ]
    case 'unanswered':
      return [
        {
          topicReplies: {
            _count: 'asc',
          },
        },
        {
          createdAt: 'desc',
        },
      ]
    default:
    case 'newest':
      return { createdAt: 'desc' }
  }
}

export type getTopics = ReturnType<typeof getTopics> extends Promise<infer T>
  ? T
  : never
export const getTopics = async (
  topicType: TopicType,
  sort: TopicSort,
  limit = 20
) => {
  const sortCriteria = getTopicSortCriteria(sort)

  return await prisma.topics.findMany({
    where: { category: topicType },
    select: {
      title: true,
      slug: true,
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          displayName: true,
          image: true,
        },
      },
      topicReplies: {
        select: {
          user: {
            select: {
              id: true,
              image: true,
              name: true,
              displayName: true,
            },
          },
        },
      },
    },
    orderBy: sortCriteria,
    take: limit,
  })
}

export const createTopic = async (
  userId: string,
  title: string,
  content: string,
  category: TopicType
) => {
  return await prisma.topics.create({
    data: {
      userId: userId,
      title: title,
      content: content,
      category: category,
      slug: convert(title),
    },
  })
}

export const deleteTopic = async (topicId: string, userId: string) => {
  return await prisma.topics.deleteMany({
    where: {
      AND: [{ id: topicId }, { userId: userId }],
    },
  })
}

export const createTopicReply = async (
  userId: string,
  topicId: string,
  content: string
) => {
  return await prisma.topicReplies.create({
    data: {
      userId,
      topicId,
      content,
    },
  })
}

export const deleteTopicReply = async (
  topicReplyId: string,
  userId: string
) => {
  return await prisma.topicReplies.deleteMany({
    where: {
      AND: [{ id: topicReplyId }, { userId: userId }],
    },
  })
}

export type getTopic = ReturnType<typeof getTopic> extends Promise<infer T>
  ? T
  : never
export const getTopic = async (topicSlug: string) => {
  return await prisma.topics.findUnique({
    where: {
      slug: topicSlug,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      topicLikes: {
        select: {
          user: true,
        },
      },
      user: true,
      topicReplies: {
        select: {
          id: true,
          userId: true,
          topicId: true,
          createdAt: true,
          content: true,
          user: true,
          topicReplyLikes: {
            select: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })
}

export type getRecentProjects = ReturnType<
  typeof getRecentProjects
> extends Promise<infer T>
  ? T
  : never
export const getRecentProjects = async (recentProjectsAmount = 5) => {
  return await prisma.projects.findMany({
    select: {
      hashtag: true,
      name: true,
      slug: true,
      pitch: true,
      avatar: true,
      profileBanner: true,
      user: {
        select: {
          name: true,
          displayName: true,
          image: true,
          id: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: recentProjectsAmount,
  })
}

export type getProjectSlugs = ReturnType<
  typeof getProjectSlugs
> extends Promise<infer T>
  ? T
  : never
export const getProjectSlugs = async (
  searchQuery: string | undefined = undefined
) => {
  return await prisma.projects.findMany({
    select: {
      slug: true,
    },
    orderBy: { createdAt: 'desc' },
    where: {
      slug: {
        contains: searchQuery,
      },
    },
  })
}

export type getProjectHashtags = ReturnType<
  typeof getProjectSlugs
> extends Promise<infer T>
  ? T
  : never
export const getProjectHashtags = async (
  searchQuery: string | undefined = undefined,
  userId: string
) => {
  return await prisma.projects.findMany({
    select: {
      hashtag: true,
    },
    orderBy: { createdAt: 'desc' },
    where: {
      AND: [
        {
          hashtag: {
            contains: searchQuery,
          },
        },
        {
          userId: userId,
        },
      ],
    },
  })
}

export const createProject = async ({
  userId,
  hashtag,
  name,
  slug,
  pitch,
  status,
  website,
  twitter,
  avatar,
  profileBanner,
}: {
  userId: string
  hashtag: string
  name: string
  slug: string
  pitch: string
  status: ProjectStatus
  website: string
  twitter: string
  avatar?: string
  profileBanner?: string
}) => {
  return await prisma.projects.create({
    data: {
      userId,
      hashtag,
      name,
      slug,
      pitch,
      status,
      website,
      twitter,
      avatar,
      profileBanner,
    },
  })
}

export type getProjectBySlug = ReturnType<
  typeof getProjectBySlug
> extends Promise<infer T>
  ? T
  : never

export const getProjectBySlug = async (projectSlug: string) => {
  return await prisma.projects.findUnique({
    where: {
      slug: projectSlug,
    },
  })
}

export type updateProject = ReturnType<typeof updateProject> extends Promise<
  infer T
>
  ? T
  : never
export const updateProject = async ({
  userId,
  id,
  hashtag,
  name,
  pitch,
  status,
  website,
  twitter,
  avatar,
  profileBanner,
}: {
  userId: string
  id: string
  hashtag: string
  name: string
  pitch: string
  status: 'active' | 'archived'
  website: string | null
  twitter: string | null
  avatar: string | null
  profileBanner: string | null
}) => {
  return await prisma.projects.update({
    where: {
      id_userId: {
        id: id,
        userId: userId,
      },
    },
    data: {
      hashtag,
      name,
      pitch,
      status,
      website,
      twitter,
      avatar,
      profileBanner,
    },
  })
}

export type getLoggedInUserSettingsFromId = ReturnType<
  typeof getLoggedInUserSettingsFromId
> extends Promise<infer T>
  ? T
  : never
export const getLoggedInUserSettingsFromId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      displayName: true,
      location: true,
      image: true,
      bio: true,
      twitter: true,
      profileBanner: true,
    },
  })
}

export type getUserDetailsByName = ReturnType<
  typeof getUserDetailsByName
> extends Promise<infer T>
  ? T
  : never
export const getUserDetailsByName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      name: username,
    },
    select: {
      name: true,
      id: true,
      displayName: true,
      bio: true,
      location: true,
      twitter: true,
      image: true,
      profileBanner: true,
      createdAt: true,

      todos: {
        select: {
          id: true,
          userId: true,
          content: true,
          done: true,
          createdAt: true,
          updatedAt: true,
          attachments: true,
          todoReplies: {
            select: {
              id: true,
              userId: true,
              content: true,
              todoReplyLikes: {
                select: {
                  user: true,
                },
              },
              todoId: true,
              user: { select: { name: true, displayName: true, image: true } },
            },
            orderBy: { createdAt: 'asc' },
          },
          todoLikes: {
            select: {
              user: true,
            },
          },
          user: {
            select: {
              name: true,
              displayName: true,
              image: true,
              id: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      projects: {
        select: {
          id: true,
          avatar: true,
          hashtag: true,
          profileBanner: true,
          pitch: true,
          slug: true,
          name: true,
          user: true,
        },
      },
    },
  })
}

export type likeTopic = ReturnType<typeof likeTopic> extends Promise<infer T>
  ? T
  : never
export const likeTopic = async (topicId: string, userId: string) => {
  return await prisma.topicLikes.create({
    data: {
      userId: userId,
      topicId: topicId,
    },
  })
}

export type unlikeTopic = ReturnType<typeof unlikeTopic> extends Promise<
  infer T
>
  ? T
  : never
export const unlikeTopic = async (topicId: string, userId: string) => {
  return await prisma.topicLikes.delete({
    where: {
      userId_topicId: {
        userId: userId,
        topicId: topicId,
      },
    },
  })
}

export type likeTopicReply = ReturnType<typeof likeTopicReply> extends Promise<
  infer T
>
  ? T
  : never
export const likeTopicReply = async (topicReplyId: string, userId: string) => {
  return await prisma.topicReplyLikes.create({
    data: {
      userId: userId,
      topicReplyId: topicReplyId,
    },
  })
}

export type unlikeTopicReply = ReturnType<
  typeof unlikeTopicReply
> extends Promise<infer T>
  ? T
  : never
export const unlikeTopicReply = async (
  topicReplyId: string,
  userId: string
) => {
  return await prisma.topicReplyLikes.delete({
    where: {
      userId_topicReplyId: {
        userId: userId,
        topicReplyId: topicReplyId,
      },
    },
  })
}

export type getProjectPageDetails = ReturnType<
  typeof getProjectPageDetails
> extends Promise<infer T>
  ? T
  : never
export const getProjectPageDetails = async (slug: string) => {
  return await prisma.projects.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      hashtag: true,
      name: true,
      slug: true,
      pitch: true,
      avatar: true,
      profileBanner: true,
      website: true,
      todos: {
        select: {
          id: true,
          userId: true,
          content: true,
          done: true,
          createdAt: true,
          updatedAt: true,
          attachments: true,
          todoReplies: {
            select: {
              id: true,
              userId: true,
              content: true,
              todoReplyLikes: {
                select: {
                  user: true,
                },
              },
              todoId: true,
              user: { select: { name: true, displayName: true, image: true } },
            },
            orderBy: { createdAt: 'asc' },
          },
          todoLikes: {
            select: {
              user: true,
            },
          },
          user: {
            select: {
              name: true,
              displayName: true,
              image: true,
              id: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      user: {
        select: {
          id: true,
          name: true,
          displayName: true,
          image: true,
        },
      },
    },
  })
}
