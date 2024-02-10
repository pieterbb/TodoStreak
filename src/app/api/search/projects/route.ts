
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getProjectHashtags } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const url = new URL(request.url)
  const query = url.searchParams.get('search')

  if (!session)
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })

  if (!query) {
    return NextResponse.json(
      { message: 'Search parameter missing' },
      { status: 400 }
    )
  }

  let result

  try {
    const rawResult = await getProjectHashtags(query, session.user.id)
    result = rawResult.map((item) => item.hashtag)

    return NextResponse.json(
      { message: 'Project hashtags fetched...', content: result },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error fetching project hashtags...' },
      { status: 500 }
    )
  }
}
