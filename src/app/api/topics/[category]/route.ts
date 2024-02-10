import { TopicSort, getTopics } from '@/lib/prismaQueries'
import { TopicType } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { category: string; sort: string } }
) {
  const { searchParams } = new URL(request.url)
  const category = params?.category as TopicType
  const validCategories: TopicType[] = ['questions', 'milestones', 'roasts']
  const sort =
    (searchParams?.get('sort') as TopicSort) || ('newest' as TopicSort)
  const validSorts: TopicSort[] = ['popular', 'unanswered', 'newest']

  if (!category || !validCategories.includes(category)) {
    return NextResponse.json({ message: 'Bad category param' }, { status: 400 })
  }

  if (sort && !validSorts.includes(sort)) {
    return NextResponse.json({ message: 'Bad sort param' }, { status: 400 })
  }

  try {
    const result = await getTopics(category, sort)
    return NextResponse.json(
      { message: 'Topics fetched...', content: result },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error fetching topics...' },
      { status: 500 }
    )
  }
}
