import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { deleteTopicReply } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

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
    await deleteTopicReply(replyId, session.user.id)
    return NextResponse.json(
      { message: 'Topic reply deleted...', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error deleting topic reply...', content: request.body },
      { status: 500 }
    )
  }
}
