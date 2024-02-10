import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { seedData } from './seedData'

const prisma = new PrismaClient()

async function main() {
  // Function to create a new user
  const createUser = async () => {
    return await prisma.user.create({
      data: {
        name: faker.person.firstName(),
        displayName: faker.internet.userName(),
        location: faker.location.city(),
        bio: seedData.bios[Math.floor(Math.random() * seedData.bios.length)],
        email: faker.internet.email(),
        image:
          seedData.avatars[Math.floor(Math.random() * seedData.avatars.length)],
      },
    })
  }

  // Function to create a new todo for a user
  const createTodo = async (userId: string) => {
    return await prisma.todos.create({
      data: {
        content:
          seedData.todos[Math.floor(Math.random() * seedData.todos.length)],
        userId: userId,
        done: faker.datatype.boolean(),
      },
    })
  }

  // Function to create a new todo streak for a user
  const createTodoStreak = async (userId: string) => {
    const todoCount = Math.floor(Math.random() * 11) + 5 // Random number between 5 and 15
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - todoCount) // Set the initial date based on the desired streak length
    const todos = []

    for (let i = 0; i < todoCount; i++) {
      const todo = await prisma.todos.create({
        data: {
          content:
            seedData.todos[Math.floor(Math.random() * seedData.todos.length)],
          userId: userId,
          done: true,
          updatedAt: currentDate,
          createdAt: currentDate,
        },
      })

      todos.push(todo)
      currentDate.setDate(currentDate.getDate() + 1) // Increase the date by 1 day for the next todo
    }

    return todos
  }

  const createTopic = async (userId: string) => {
    return await prisma.topics.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: userId,
        category: faker.helpers.arrayElement([
          'questions',
          'milestones',
          'roasts',
        ]),
        slug: faker.lorem.slug(),
        topicLikes: {
          create: [
            {
              userId: userId,
            },
          ],
        },

        topicReplies: {
          create: [
            {
              content: faker.lorem.paragraph(),
              userId: userId,
              topicReplyLikes: {
                create: [
                  {
                    userId: userId,
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }

  // Function to create a new project for a user
  const createProject = async (userId: string) => {
    const projectName = faker.company.name()
    const hashtag = faker.word.verb(1)

    return await prisma.projects.create({
      data: {
        userId: userId,
        hashtag: hashtag,
        name: projectName,
        slug: faker.lorem.slug(),
        pitch: faker.lorem.sentence(),
        status: 'active',
        avatar: faker.image.urlLoremFlickr({
          width: 128,
          height: 128,
          category: 'people',
        }),
        profileBanner: faker.image.urlLoremFlickr({
          width: 1200,
          height: 800,
          category: 'people',
        }),
        website: faker.internet.url(),
        twitter: faker.internet.userName(),
        todos: {
          create: [
            {
              content: `${
                seedData.todos[
                  Math.floor(Math.random() * seedData.todos.length)
                ]
              } #${hashtag}`,
              userId: userId,
              done: faker.datatype.boolean(),
            },
            // Add more todos if needed
          ],
        },
      },
    })
  }
  // Generate random images attachments and add them to a todo
  const createArrayOfRandomImagesForTodo = async (
    todoId: string,
    userId: string
  ) => {
    const randomImages = []
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      randomImages.push(
        faker.image.urlPicsumPhotos({ width: 640, height: 480 })
      )
    }
    const attachments = randomImages.map((imageUrl) => ({
      type: 'image',
      userId: userId,
      url: imageUrl,
      todoId: todoId,
    }))

    return await prisma.attachments.createMany({
      data: attachments,
    })
  }

  // Function for a user to like a todo
  const createTodoLike = async (userId: string, todoId: string) => {
    return await prisma.todoLikes.create({
      data: {
        userId: userId,
        todoId: todoId,
      },
    })
  }

  // Function to create a new reply for a todo by a user
  const createTodoReplies = async (userId: string, todoId: string) => {
    return await prisma.todoReplies.create({
      data: {
        content: faker.company.catchPhrase(),
        userId: userId,
        todoId: todoId,
      },
    })
  }

  // Function for a user to like a reply on a todo
  const createTodoReplyLikes = async (replyId: string, userId: string) => {
    return await prisma.todoReplyLikes.create({
      data: {
        replyId: replyId,
        userId: userId,
      },
    })
  }

  // Function for a user to like a topic
  const createTopicLike = async (userId: string, topicId: string) => {
    return await prisma.topicLikes.create({
      data: {
        userId: userId,
        topicId: topicId,
      },
    })
  }

  // Function for a user to like a reply on a todo
  const createTopicReplyLikes = async (
    topicReplyId: string,
    userId: string
  ) => {
    return await prisma.topicReplyLikes.create({
      data: {
        topicReplyId: topicReplyId,
        userId: userId,
      },
    })
  }

  // Function to like random todos of other users
  const likeRandomTodosOfOtherUsers = async (userId: string, count: number) => {
    const todos = await prisma.todos.findMany({
      where: {
        NOT: {
          userId: userId,
        },
      },
    })

    const randomTodos = todos.sort(() => Math.random() - 0.5).slice(0, count)

    for (const todo of randomTodos) {
      await createTodoLike(userId, todo.id)
      console.log(
        `Created like for other user's todo by user ${userId} for todo id: ${todo.id}...`
      )
    }
  }

  // Function to like random todo replies of other users
  const likeRandomTodoReplyLikesOfOtherUsers = async (
    userId: string,
    count: number
  ) => {
    const todoReplies = await prisma.todoReplies.findMany({
      where: {
        NOT: {
          userId: userId,
        },
      },
      include: {
        todoReplyLikes: true,
      },
    })

    const randomReplies = todoReplies
      .filter((reply) => reply.todoReplyLikes.length === 0) // Filter out replies already liked by the user
      .sort(() => Math.random() - 0.5)
      .slice(0, count)

    for (const reply of randomReplies) {
      await createTodoReplyLikes(reply.id, userId)
    }
  }

  // Function to like random topics  of other users
  const likeRandomTopicsOfOtherUsers = async (
    userId: string,
    count: number
  ) => {
    const topics = await prisma.topics.findMany({
      where: {
        NOT: {
          userId: userId,
        },
      },
    })

    const randomTopics = topics.sort(() => Math.random() - 0.5).slice(0, count)

    for (const randomTopic of randomTopics) {
      const topic = await createTopicLike(userId, randomTopic.id)
      console.log(
        `Created like for other user's topic by user ${userId} for topic id: ${topic.id}...`
      )
    }
  }

  // Function to like random todo replies of other users
  const likeRandomTopicReplyOfOtherUsers = async (
    userId: string,
    count: number
  ) => {
    const topicReplies = await prisma.topicReplies.findMany({
      where: {
        NOT: {
          userId: userId,
        },
      },
      include: {
        topicReplyLikes: true,
      },
    })

    const randomReplies = topicReplies
      .filter((reply) => reply.topicReplyLikes.length === 0) // Filter out replies already liked by the user
      .sort(() => Math.random() - 0.5)
      .slice(0, count)

    for (const topicReply of randomReplies) {
      await createTopicReplyLikes(topicReply.id, userId)
    }
  }

  // Start seeding

  console.log('Start seeding...')

  try {
    // Create a new user
    const user = await createUser()

    console.log(`Created user with id: ${user.id}...`)

    // Create a todo
    const todo = await createTodo(user.id)
    console.log(`Created todo with id: ${todo.id}...`)

    // Create image attachments for the todo
    await createArrayOfRandomImagesForTodo(todo.id, user.id)

    console.log(`Created attachments for todo: ${todo.id}...`)

    // Let the user like the todo
    const todoLike = await createTodoLike(user.id, todo.id)

    console.log(`Created todo like with todoLike id: ${todoLike.id}...`)

    // Create 5 replies for the todo and like them yourself randomly
    for (let i = 0; i < 5; i++) {
      const reply = await createTodoReplies(user.id, todo.id)
      console.log(`Created todo reply for ${todo.id} with id: ${reply.id}...`)
      // Randomly like the reply or not
      const shouldLike = Math.random() < 0.5
      if (shouldLike) {
        await createTodoReplyLikes(reply.id, user.id)
        console.log(`Created todo reply like for reply: ${reply.id}...`)
      }
    }

    // Like 10 random todo's of other users
    await likeRandomTodosOfOtherUsers(user.id, 10)
    console.log("Liked 5 random todo's of other users...")

    // Like 10 random replies of other users
    await likeRandomTodoReplyLikesOfOtherUsers(user.id, 10)
    console.log('Liked 5 random todo replies of other users...')

    // Like 10 random topics of other users
    await likeRandomTopicsOfOtherUsers(user.id, 10)
    console.log('Liked 5 random topics of other users...')

    // Like 10 random topics replies of other users
    await likeRandomTopicReplyOfOtherUsers(user.id, 10)
    console.log('Liked 5 random topic replies of other users...')

    // Create a new project
    const project = await createProject(user.id)
    console.log(`Created project: ${project.id}...`)

    // Create a new todo streak for the user
    const todoStreak = await createTodoStreak(user.id)
    console.log(`Created a todo streak with ${todoStreak.length} todos...`)

    // Create a new topic in a randomn category
    const topic = await createTopic(user.id)
    console.log(`Created topic: ${topic.id}...`)
  } catch (error) {
    console.log(error)
  }
}

// Create a question, like it yourself, create 2 own replies and like them all

// Create a roast, like it yourself, create 2 own replies and like them all

// Create a milestone, like it yourself, create 2 own replies and like them all

// Get all questions, roast, milestones, todo's and replies and like them randomly

for (let i = 0; i < 10; i++) {
  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      console.log('Seeding done!')
      // await prisma.$disconnect()
    })
}
