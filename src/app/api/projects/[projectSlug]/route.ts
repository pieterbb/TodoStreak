// Fetch project details by project slug

import { getProjectPageDetails } from '@/lib/prismaQueries'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { projectSlug: string } }
) {
  const projectSlug = params.projectSlug
  if (!projectSlug) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  try {
    const result = await getProjectPageDetails(projectSlug)
    if (!result) {
      return NextResponse.json(
        { message: 'Project not found...' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Project details fetched...', content: result },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error fetching project details...' },
      { status: 500 }
    )
  }
}
