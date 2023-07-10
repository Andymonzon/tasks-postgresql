import express from 'express'
import morgan from 'morgan'
import authRoutes from './router/auth.routes.js'
import cookieParser from 'cookie-parser'
import taskRoutes from './router/task.routes.js'
import cors from 'cors'
import { URL_CLIENT } from './config.js'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: URL_CLIENT,
        credentials: true,
    })
)

app.use('/api', authRoutes)
app.use('/api', taskRoutes)
