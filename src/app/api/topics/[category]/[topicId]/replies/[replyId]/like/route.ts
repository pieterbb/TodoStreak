import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { likeTopicReply, unlikeTopicReply } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { replyId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const replyId = params?.replyId as string
  if (!replyId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await likeTopicReply(replyId, session.user.id)
    return NextResponse.json(
      { message: 'Topic reply liked...', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error liking topic reply...', content: request.body },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { replyId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const replyId = params?.replyId as string
  if (!replyId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    await unlikeTopicReply(replyId, session.user.id)
    return NextResponse.json(
      { message: 'Topic reply unliked...', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error unliking topic reply...', content: request.body },
      { status: 500 }
    )
  }
}
