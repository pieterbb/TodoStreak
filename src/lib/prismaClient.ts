import { PrismaClient } from '@prisma/client'

// Global variable to hold the PrismaClient instance. So you don't have to recreate it everywere.
let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    try {
      global.prisma = new PrismaClient()
    } catch (error) {
      console.log(error)
    }
  }

  prisma = global.prisma as PrismaClient
}

export default prisma
