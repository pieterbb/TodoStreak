import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createTodoItem, getTodosPrisma } from '@/lib/prismaQueries'
import { todoItemSchema } from '@/lib/validations/TodoItemSchema'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const cursorId = url.searchParams.get('cursor')
  const cursorObj = cursorId ? { id: cursorId } : undefined
  const isTodoDoneFilter = url.searchParams.get('isTodoDoneFilter') === 'true'
  const userId = url.searchParams.get('userId') || undefined
  const projectId = url.searchParams.get('projectId') || undefined


  try {
    const result = await getTodosPrisma(
      cursorObj,
      isTodoDoneFilter,
      userId,
      projectId
    )

    return NextResponse.json(
      {
        message: 'Todo items fetched',
        content: result,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error while fetching todo...' },
      { status: 500 }
    )
  }
}

type BodyPOST = {
  content: string
  done: boolean
  attachments: string[] | undefined
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { message: 'Not logged in to post todo' },
      { status: 401 }
    )
  }

  const body: BodyPOST = await request.json()
  try {
    await todoItemSchema.parse(body)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Schema not valid' }, { status: 400 })
  }

  // Connect todo to project if project hashtag is present
  const words = body?.content?.split(' ')
  let hashtag = words.find((word) => word.startsWith('#'))
  let todoProjectId
  if (hashtag) {
    hashtag = hashtag.substring(1) // Remove the "#" character
    const project = await prisma.projects.findFirst({
      where: {
        AND: [{ hashtag }, { userId: session.user.id }],
      },
    })

    todoProjectId = project?.id
  }

  try {
    const result = await createTodoItem(
      body.content,
      body.done,
      session.user.id,
      body?.attachments,
      todoProjectId || undefined
    )

    return NextResponse.json(
      {
        message: 'Todo added',
        content: result,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error while adding todo...' },
      { status: 500 }
    )
  }
}
