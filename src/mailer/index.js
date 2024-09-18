import express from 'express'
import 'dotenv/config'

export const mailer = express()
const router = express.Router()

mailer.use(router)
