import { Router } from 'express'
import contentRouter from './contentRoutes'
import brainRouter from './brainRoutes'
import userRouter from './userRoutes'
const apiRouter = Router()
apiRouter.use('/auth', userRouter)
apiRouter.use('/content', contentRouter)
apiRouter.use('/brain', brainRouter)

export default apiRouter