import { Router } from 'express'
import { validateToken } from '../middleware/validateToken.middleware.js'
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} from '../controllers/task.controllers.js'

const router = Router()

router.get('/task', validateToken, getTasks)
router.get('/task/:id', validateToken, getTask)
router.post('/task', validateToken, createTask)
router.put('/task/:id', validateToken, updateTask)
router.delete('/task/:id', validateToken, deleteTask)

export default router
