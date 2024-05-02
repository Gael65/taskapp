import z from 'zod'

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }),
  email: z.string({
    required_error: 'Email is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  })
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}

export function validateModifiedUser (object) {
  return userSchema.partial().safeParse(object)
}
