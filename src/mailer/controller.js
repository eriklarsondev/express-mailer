import { MailerService } from './service'

export class MailerController extends MailerService {
  constructor() {
    super()
  }

  async sendEmail(req, res, next) {
    try {
      res.status(200).send('Hello, world!')
    } catch (err) {
      next(err)
    }
  }
}
