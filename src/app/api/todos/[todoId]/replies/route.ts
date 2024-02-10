import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createReply } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const { content } = await request.json()

  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const todoId = params?.todoId as string
  if (!todoId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await createReply(content, todoId, session.user.id)
    return NextResponse.json(
      { message: 'Reply created', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error while creating reply...', content: request.body },
      { status: 500 }
    )
  }
}
