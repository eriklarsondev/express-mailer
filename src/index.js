import express from 'express'
import path from 'path'
import colors from 'colors'
import 'dotenv/config'

import { mailer } from './mailer'

const app = express()
const port = process.env.PORT || 3000

// configure body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// set view engine
app.set('view engine', 'ejs')

app.use(mailer)

// render static file for endpoints
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'index.html'))
})

// start app
app.listen(port, () => {
  console.log(`\napp is running on port ${colors.bold(port)}\n`.cyan)
})
