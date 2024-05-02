import jwt from 'jsonwebtoken'

export function verifyToken (req, res, next) {
  const authorization = req.headers.authorization
  const [prefix, token] = authorization.split(' ')

  if (prefix !== 'Bearer') return res.status(400).json({ message: 'Expected Bearer token' })

  try {
    const user = jwt.verify(token, process.env.SECRET)
    res.locals.user = user
    return next()
  } catch (e) {
    return res.status(401).json({ error: 'Not authorized' })
  }
}
