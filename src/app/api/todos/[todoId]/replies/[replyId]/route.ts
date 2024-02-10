import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { deleteReply } from '@/lib/prismaQueries'
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
    await deleteReply(replyId, session.user.id)
    return NextResponse.json(
      { message: 'Reply deleted', content: request.body },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error while deleting reply...', content: request.body },
      { status: 500 }
    )
  }
}
