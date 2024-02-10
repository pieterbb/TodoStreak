import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { createProject, updateProject } from '@/lib/prismaQueries'
import {
  EditProjectSchema,
  editProjectSchema,
} from '@/lib/validations/EditProjectSchema'
import { newProjectSchema } from '@/lib/validations/NewProjectSchema'
import { Prisma } from '@prisma/client'
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
    await newProjectSchema.parse(body)
  } catch (error) {
    return NextResponse.json({ message: 'Schema not valid' }, { status: 400 })
  }

  try {
    result = await createProject({
      userId: session.user.id,
      hashtag: body.hashtag,
      name: body.name,
      slug: body.slug,
      pitch: body.pitch,
      status: body.status,
      website: body.website,
      twitter: body.twitter,
      avatar: body?.avatar,
      profileBanner: body?.banner,
    })
    return NextResponse.json(
      { message: 'Project created...', content: result },
      { status: 200 }
    )
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message:
            'A project with the same name, slug, or hashtag already exists.',
          content: body,
        },
        { status: 400 }
      )
    } else {
      console.log(error)
      return NextResponse.json(
        { message: 'Error creating project...', content: body },
        { status: 500 }
      )
    }
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  const body = await request.json()
  let result = null
  let parsedBody: EditProjectSchema

  try {
    parsedBody = await editProjectSchema.parse(body)
  } catch (error) {
    return NextResponse.json({ message: 'Schema not valid' }, { status: 400 })
  }

  try {
    const project = await prisma.projects.findUnique({
      where: { id: parsedBody.id },
      select: { hashtag: true },
    })

    if (!project) {
      return NextResponse.json(
        {
          message: 'Error updating project...',
          content: body,
        },
        { status: 500 }
      )
    }

    // If the hashtag is changed, search & replace all the hashtags in the todos so they stay in sync
    if (project.hashtag !== parsedBody.hashtag) {
      const currentHashtag = project.hashtag
      const newHashtag = parsedBody.hashtag

      const result = await prisma.$transaction(async (prisma) => {
        // Regular update Project
        await updateProject({
          userId: session.user.id,
          ...parsedBody,
        })

        const todos = await prisma.todos.findMany({
          where: {
            userId: session?.user?.id,
            content: {
              contains: currentHashtag,
            },
          },
          include: {
            projects: {
              where: {
                id: parsedBody.id,
              },
            },
          },
        })

        const updateTodosPromises = todos.map((todo) => {
          const regex = new RegExp(`#${currentHashtag}`, 'g')
          return prisma.todos.update({
            where: { id: todo.id },
            data: {
              content: todo.content.replace(regex, `#${newHashtag}`),
            },
          })
        })

        await Promise.all(updateTodosPromises)
      })
      return NextResponse.json(
        { message: 'Project updated...', content: result },
        { status: 200 }
      )
    } else {
      result = await updateProject({
        userId: session.user.id,
        ...parsedBody,
      })
      return NextResponse.json(
        { message: 'Project updated...', content: result },
        { status: 200 }
      )
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message:
            'A project with the same name, slug, or hashtag already exists.',
          content: body,
        },
        { status: 400 }
      )
    } else {
      console.log(error)
      return NextResponse.json(
        { message: 'Error updating project...', content: body },
        { status: 500 }
      )
    }
  }
}
