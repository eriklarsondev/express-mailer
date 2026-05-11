import { Router } from 'express'
import { mailerController } from '../controllers/mailer.controller'

const router = Router()

router.post('/send', (req, res, next) => mailerController.send(req, res, next))

export default router
