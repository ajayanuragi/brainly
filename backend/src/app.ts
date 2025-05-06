import express from 'express'
import cors from 'cors'
import apiRouter from './routes/apiRoutes'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }))

app.use(express.json())
app.use('/api/v1/', apiRouter)

export default app