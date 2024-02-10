import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { deleteTodoItem } from '@/lib/prismaQueries'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const session = await getServerSession(authOptions)

  // Check if user is logged in
  if (!session) {
    return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
  }

  // Validate todoId in request
  const todoId = params?.todoId as string
  if (!todoId)
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })

  // Delete todo item
  try {
    await deleteTodoItem(todoId, session.user.id)
    return NextResponse.json({ message: 'Todo deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error while deleting todo...' },
      { status: 500 }
    )
  }
}
