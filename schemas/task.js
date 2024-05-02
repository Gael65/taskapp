import z from 'zod'

const taskSchema = z.object({
  title: z.string({
    required_error: 'Task title is required',
    invalid_type_error: 'Task title must be a string'
  }),
  description: z.string({
    invalid_type_error: 'Task description must be a string'
  })
})

export function validateTask (object) {
  return taskSchema.safeParse(object)
}

export function validateModifiedTask (object) {
  return taskSchema.partial().safeParse(object)
}
