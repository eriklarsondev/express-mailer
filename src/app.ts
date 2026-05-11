import 'dotenv/config'
import express, { Express } from 'express'
import helmet from 'helmet'
import config from './config/app.config'
import { errorHandler } from './middleware/error.middleware'
import { mailRateLimiter } from './middleware/rate-limit.middleware'
import mailerRoutes from './routes/mailer.routes'

const app: Express = express()
const port: number = config.port

app.use(helmet())
app.use(express.json())

app.use('/mail', mailRateLimiter, mailerRoutes)

app.use(errorHandler)

app.listen(port, (): void => {
  console.log(`\napp is running on port ${port}\n`)
})
