import request from 'supertest'
import app from '../app'
import { mailerService } from '../services/mailer.service'

jest.mock('../services/mailer.service', () => ({
  mailerService: { sendMail: jest.fn() }
}))

const mockSendMail = mailerService.sendMail as jest.Mock

const ENDPOINT = '/mail/send'
const VALID_BODY = { to: 'user@example.com', subject: 'Hello', text: 'World' }

describe('POST /mail/send', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('validation', () => {
    it('returns 400 when "to" is missing', async () => {
      const res = await request(app).post(ENDPOINT).send({ subject: 'Hello', text: 'World' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/required/)
    })

    it('returns 400 when "subject" is missing', async () => {
      const res = await request(app).post(ENDPOINT).send({ to: 'user@example.com', text: 'World' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/required/)
    })

    it('returns 400 when both "text" and "html" are missing', async () => {
      const res = await request(app)
        .post(ENDPOINT)
        .send({ to: 'user@example.com', subject: 'Hello' })
      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/required/)
    })
  })

  describe('success', () => {
    it('returns 200 and calls sendMail with text body', async () => {
      mockSendMail.mockResolvedValueOnce(undefined)
      const res = await request(app).post(ENDPOINT).send(VALID_BODY)
      expect(res.status).toBe(200)
      expect(res.body.message).toBe('Email sent successfully')
      expect(mockSendMail).toHaveBeenCalledWith(VALID_BODY)
    })

    it('returns 200 and calls sendMail with html body', async () => {
      mockSendMail.mockResolvedValueOnce(undefined)
      const body = { to: 'user@example.com', subject: 'Hello', html: '<p>World</p>' }
      const res = await request(app).post(ENDPOINT).send(body)
      expect(res.status).toBe(200)
      expect(mockSendMail).toHaveBeenCalledWith(body)
    })
  })

  describe('error handling', () => {
    beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}))
    afterEach(() => jest.restoreAllMocks())

    it('returns 500 when sendMail throws', async () => {
      mockSendMail.mockRejectedValueOnce(new Error('SMTP connection refused'))
      const res = await request(app).post(ENDPOINT).send(VALID_BODY)
      expect(res.status).toBe(500)
      expect(res.body.error).toBe('Internal server error')
    })
  })
})
