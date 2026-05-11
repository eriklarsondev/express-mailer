import nodemailer, { Transporter } from 'nodemailer'
import config from '../config/app.config'

export interface SendMailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

class MailerService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    })
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    await this.transporter.sendMail({ from: config.smtp.from, ...options })
  }
}

export const mailerService = new MailerService()
