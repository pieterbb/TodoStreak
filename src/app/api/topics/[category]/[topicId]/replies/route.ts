import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createTopicReply } from '@/lib/prismaQueries'
import { topicReplySchema } from '@/lib/validations/TopicReplySchema'
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

  const topicId = params?.topicId as string
  if (!topicId) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    const body = await request.json()
    await topicReplySchema.parse(body)

    await createTopicReply(session.user.id, topicId, body.content)
    return NextResponse.json(
      { message: 'Topic reply created...', content: body },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error creating topic reply...', content: request.body },
      { status: 500 }
    )
  }
}
