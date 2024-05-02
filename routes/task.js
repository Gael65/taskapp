import { Router } from 'express'
import { TaskController } from '../controllers/task.js'

export const taskRouter = Router()

taskRouter.get('/', TaskController.getAll)
taskRouter.post('/', TaskController.create)
taskRouter.patch('/:id', TaskController.update)
taskRouter.delete('/:id', TaskController.delete)
