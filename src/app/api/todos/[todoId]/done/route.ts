import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { setTodoStatusDone, setTodoStatusPending } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const todoId = params?.todoId as string
  if (!todoId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await setTodoStatusDone(todoId, session.user.id)
    return NextResponse.json(
      { message: 'Todo status done', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error while updating todo...', content: request.body },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const todoId = params?.todoId as string
  if (!todoId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await setTodoStatusPending(todoId, session.user.id)
    return NextResponse.json(
      { message: 'Todo status pending', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error while updating todo...', content: request.body },
      { status: 500 }
    )
  }
}
