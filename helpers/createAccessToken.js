import jwt from 'jsonwebtoken'

export function createAccessToken ({ user }) {
  const { id, name, email } = user
  return jwt.sign({ id, name, email }, process.env.SECRET, { expiresIn: '1hr' })
}
