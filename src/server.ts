import config from './config/app.config'
import app from './app'

app.listen(config.port, (): void => {
  console.log(`\napp is running on port ${config.port}\n`)
})
