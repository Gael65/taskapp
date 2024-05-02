import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserModel {
  static async create ({ input }) {
    try {
      const newUser = await prisma.user.create({
        data: input
      })

      delete newUser.password
      return newUser
    } catch (error) {
      return false
    }
  }

  static async login ({ input }) {
    const { email, password } = input

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      })

      return user
    } catch (error) {
      return false
    }
  }
}
