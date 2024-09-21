import { MailerService } from './service'

export class MailerController extends MailerService {
  constructor() {
    super()
  }

  async sendEmail(req, res, next) {
    try {
      await super.sendEmail(req.body)
      res.status(200).json({ statusCode: 200, message: 'Email has been sent successfully' })
    } catch (err) {
      next(err)
    }
  }
}
