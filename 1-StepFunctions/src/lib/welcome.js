const randomIndex = max => Math.floor(Math.random() * max)

const messages = ['Hello World', 'Welcome', 'Sawubona Umhlaba']

export class WelcomeError extends Error {
  constructor (message) {
    super()
    this.name = 'WelcomeError'
    this.message = message
    this.statusCode = 500
  }
}

export const get = () => {
  // const messageCount = messages.length
  const messageCount = 10
  const message = messages[randomIndex(messageCount)]
  if (!message) {
    throw new WelcomeError('Could not get welcome')
  }
  return message
}
