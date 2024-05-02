import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

export const userRouter = Router()

userRouter.post('/', UserController.create)
userRouter.post('/login', UserController.login)
userRouter.get('/renew', verifyToken, UserController.revalidateToken)
