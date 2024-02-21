import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRouter)

export default app
