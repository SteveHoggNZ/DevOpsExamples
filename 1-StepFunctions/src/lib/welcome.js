import { sleep } from './util'
import * as sf from './sf'

const randomIndex = max => Math.floor(Math.random() * max)

const messages = ['Hello World', 'Welcome', 'Sawubona Umhlaba']

class WelcomeError extends Error {
  constructor (message) {
    super()
    this.name = 'WelcomeError'
    this.message = message
    this.statusCode = 500
  }
}

export const get = async () => {
  await sleep(Math.random() * 3000)

  // const messageCount = messages.length
  const messageCount = 6
  const message = messages[randomIndex(messageCount)]

  if (!message) {
    throw new WelcomeError('Could not get welcome')
  }

  return message
}

export const getWithRetry = async () => {
  return sf.startThenWait(process.env.WELCOME_RETRY_STATE_MACHINE, {
    test: 'test input'
  })
}
