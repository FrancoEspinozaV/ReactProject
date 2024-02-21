import { Router } from 'express'
import {
  login,
  logout,
  profile,
  register,
} from '../controllers/auth.controller.js'
import { authRequired } from '../middleware/validateToken.js'
import { validateSchema } from '../middleware/validateSchema.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router
