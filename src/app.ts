import 'dotenv/config'
import express, { Express } from 'express'
import helmet from 'helmet'
import { errorHandler } from './middleware/error.middleware'
import { mailRateLimiter } from './middleware/rate-limit.middleware'
import mailerRoutes from './routes/mailer.routes'

const app: Express = express()

app.use(helmet())
app.use(express.json())

app.use('/mail', mailRateLimiter, mailerRoutes)

app.use(errorHandler)

export default app
