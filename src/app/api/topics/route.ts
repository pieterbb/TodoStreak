import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createTopic } from '@/lib/prismaQueries'
import { newTopicItem } from '@/lib/validations/NewTopicSchema'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const body = await request.json()
  let result = null

  try {
    await newTopicItem.parse(body)
  } catch (error) {
    return NextResponse.json({ message: 'Schema not valid' }, { status: 400 })
  }

  try {
    result = await createTopic(
      session.user.id,
      body.title,
      body.content,
      body.category
    )
    return NextResponse.json(
      { message: 'Topic created...', content: result },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error creating topic...', content: body },
      { status: 500 }
    )
  }
}
