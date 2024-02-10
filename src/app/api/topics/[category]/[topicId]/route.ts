import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { deleteTopic, getTopic } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { topicId: string } }
) {
  const topicId = params?.topicId as string
  if (!topicId)
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })

  try {
    const result = await getTopic(topicId)
    return NextResponse.json(
      {
        message: 'Topic fetched...',
        content: result,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching topic...' },
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

  const topicId = params?.topicId as string
  if (!topicId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    const result = await deleteTopic(topicId, session.user.id)
    return NextResponse.json(
      { message: 'Topic deleted...', content: result },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error deleting topic...' },
      { status: 500 }
    )
  }
}
