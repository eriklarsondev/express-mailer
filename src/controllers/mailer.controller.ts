import { NextFunction, Request, Response } from 'express'
import { mailerService, SendMailOptions } from '../services/mailer.service'

class MailerController {
  async send(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { to, subject, text, html } = req.body as SendMailOptions

    if (!to || !subject || (!text && !html)) {
      res
        .status(400)
        .json({ error: 'Fields "to", "subject", and one of "text" or "html" are required' })
      return
    }

    try {
      await mailerService.sendMail({ to, subject, text, html })
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (err) {
      next(err)
    }
  }
}

export const mailerController = new MailerController()
