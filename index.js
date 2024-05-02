import express from 'express'
import { userRouter } from './routes/user.js'
import { taskRouter } from './routes/task.js'
import { corsMiddleware } from './middlewares/corsMiddleware.js'
import { verifyToken } from './middlewares/authMiddleware.js'

const app = express()
const PORT = process.env.PORT ?? 1234

app.use(corsMiddleware())
app.disable('x-powered-by')
app.use(express.json())

app.use('/user', userRouter)
app.use('/task', verifyToken, taskRouter)

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
