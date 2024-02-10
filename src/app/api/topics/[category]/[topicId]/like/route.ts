import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { likeTopic, unlikeTopic } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { topicId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const topicId = params?.topicId
  if (!topicId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await likeTopic(topicId, session.user.id)
    return NextResponse.json(
      { message: 'Topic liked', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error (un)liking topic...', content: request.body },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { topicId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const topicId = params?.topicId
  if (!topicId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await unlikeTopic(topicId, session.user.id)
    return NextResponse.json(
      { message: 'Topic unliked', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error (un)liking topic...', content: request.body },
      { status: 500 }
    )
  }
}
