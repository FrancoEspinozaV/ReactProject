import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/task.routes.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRouter)
app.use('/api', taskRouter)

export default app
