import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prismaClient'
import { userSettingsSchema } from '@/lib/validations/UserSettingsSchema'
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  // Check if user is logged in
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  // Validate if body is correct and matches schema
  const body = await request.json()
  try {
    await userSettingsSchema.parse(body)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Schema not valid' }, { status: 400 })
  }

  // Update user in database
  try {
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name: body.name,
        displayName: body.displayName,
        bio: body.bio,
        location: body.location,
        twitter: body.twitter,
        profileBanner:
          body?.profileBanner && body.profileBanner !== ''
            ? body.profileBanner
            : undefined,
        image: body?.image && body.image !== '' ? body.image : undefined,
      },
    })
    return NextResponse.json(
      { message: 'Settings saved!', content: '' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error?.code === 'P2002') {
        return NextResponse.json(
          {
            message:
              'An user with this username already exists. Try something else.',
          },
          { status: 500 }
        )
      }
    }
    return NextResponse.json(
      { message: "Can't save settings to database" },
      { status: 401 }
    )
  }
}
