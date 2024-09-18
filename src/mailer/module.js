import express from 'express'
import 'dotenv/config'

import { MailerController } from './controller'

export const mailer = express()
const router = express.Router()

const controller = new MailerController()

router.post('/', controller.sendEmail)

mailer.use(router)
