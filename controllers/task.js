import { TaskModel } from '../models/task.js'
import { validateModifiedTask, validateTask } from '../schemas/task.js'

export class TaskController {
  static async getAll (_, res) {
    const tasks = await TaskModel.getAll({ id: res.locals.user.id })
    res.json(tasks)
  }

  static async create (req, res) {
    const result = validateTask(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTask = await TaskModel.create({
      input: {
        ...result.data,
        userId: res.locals.user.id
      }
    })

    res.status(201).json(newTask)
  }

  static async update (req, res) {
    const result = validateModifiedTask(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedTask = await TaskModel.update({ id, input: result.data })

    return res.json(updatedTask)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await TaskModel.delete({ id })

    if (!result) return res.status(404).json({ message: 'Task not found!' })

    res.json({ message: 'Task deleted' })
  }
}
