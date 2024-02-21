import { Router } from 'express'
import { authRequired } from '../middleware/validateToken.js'
import {
  createTask,
  deleteTaks,
  getTak,
  getTaks,
  updateTaks,
} from '../controllers/task.controller.js'
import { validateSchema } from '../middleware/validateSchema.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const route = Router()

route.get('/tasks', authRequired, getTaks)
route.get('/tasks/:id', authRequired, getTak)
route.delete('/tasks/:id', authRequired, deleteTaks)
route.put('/tasks/:id', authRequired, updateTaks)
route.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)

export default route
