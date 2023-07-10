import { Router } from 'express'
import {
    loginAuth,
    registerAuth,
    logout,
    verifyToken,
} from '../controllers/auth.controllers.js'
import { validateSchema } from '../middleware/validatorSchema.middleware.js'
import { loginSchema, registerSchema } from '../schema/auth.schema.js'

const router = Router()

router.post('/login', validateSchema(loginSchema), loginAuth)

router.post('/register', validateSchema(registerSchema), registerAuth)

router.post('/logout', logout)

router.get('/verifytoken', verifyToken)

export default router
