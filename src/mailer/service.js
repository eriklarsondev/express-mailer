import nodemailer from 'nodemailer'
import path from 'path'
import ejs from 'ejs'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export class MailerService {
  constructor() {}

  async sendEmail(fields) {
    const template = path.join(__dirname, '..', '..', 'views', 'emailTemplate.ejs')

    ejs.renderFile(template, { fields: fields }, function (err, data) {
      if (err) throw new Error(err)

      const config = {
        from: `"Erik Larson" <${process.env.SMTP_USER}>`,
        to: process.env.TARGET_EMAIL,
        subject: 'Notification - Express Mailer',
        html: data
      }

      transporter.sendMail(config, function (err, info) {
        if (err) throw new Error(err)
      })
    })
  }
}
