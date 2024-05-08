import { PrismaClient } from '@prisma/client'
import { getDate } from '../helpers/getDate.js'

const prisma = new PrismaClient()

export class TaskModel {
  static async getAll ({ id }) {
    return await prisma.task.findMany({
      where: {
        userId: id
      }
    })
  }

  static async create ({ input }) {
    const newTask = await prisma.task.create({
      data: {
        ...input,
        createdDate: getDate()
      }
    })

    return newTask
  }

  static async update ({ id, input }) {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: input
    })

    return updatedTask
  }

  static async delete ({ id }) {
    try {
      await prisma.task.delete({
        where: { id: parseInt(id) }
      })
      return { success: true, id }
    } catch (e) {
      return { success: false, id: null }
    }
  }
}
