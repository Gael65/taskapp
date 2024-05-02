import { createHash } from 'node:crypto'
import { UserModel } from '../models/user.js'
import { validateUser } from '../schemas/user.js'
import { createAccessToken } from '../helpers/createAccessToken.js'

export class UserController {
  static async create (req, res) {
    const result = validateUser(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const password = createHash('sha256').update(result.data.password).digest('hex')

    const newUser = await UserModel.create({
      input: {
        ...result.data,
        password
      }
    })

    if (!newUser) return res.status(500).json({ error: 'Error creating user' })

    const accessToken = createAccessToken({
      user: {
        ...result.data,
        id: newUser.id
      }
    })

    res.status(201).json({
      ...newUser,
      accessToken
    })
  }

  static async login (req, res) {
    const password = createHash('sha256').update(req.body.password).digest('hex')

    const result = await UserModel.login({
      input: {
        email: req.body.email,
        password
      }
    })

    if (!result) return res.status(404).json({ error: 'User not found!' })

    const accessToken = createAccessToken({ user: result })

    delete result.password
    res.json({
      ...result,
      accessToken
    })
  }

  static revalidateToken (_, res) {
    const { id, name, email } = res.locals.user
    const accessToken = createAccessToken({ user: { id, name, email } })

    return res.json({ id, name, email, accessToken })
  }
}
