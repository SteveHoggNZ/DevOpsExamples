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

const sleep = ms => new Promise((resolve, reject) => {
  setTimeout(resolve, ms)
})

export const get = async () => {
  await sleep(Math.random() * 3000)

  // const messageCount = messages.length
  const messageCount = 10
  const message = messages[randomIndex(messageCount)]

  if (!message) {
    throw new WelcomeError('Could not get welcome')
  }

  return message
}
