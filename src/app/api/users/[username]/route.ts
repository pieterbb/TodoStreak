import { getUserDetailsByName } from '@/lib/prismaQueries'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const result = await getUserDetailsByName(params.username)
    if (!result) {
      return NextResponse.json(
        { message: 'User not found...' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      {
        message: 'User details fetched...',
        content: result,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error fetching user details...' },
      { status: 500 }
    )
  }
}
