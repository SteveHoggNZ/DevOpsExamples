const randomIndex = max => Math.floor(Math.random() * max)

const messages = ['Hello World', 'Welcome', 'Sawubona Umhlaba']

export class WelcomeError extends Error {
  constructor (message) {
    super()
    this.name = 'WelcomeError'
    this.message = message
  }
}

export const getWelcome = async (event, context, callback) => {
  try {
    const message = messages[randomIndex(10)]
    if (!message) {
      throw new WelcomeError('Could not get welcome')
    }
    callback(null, { message })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}
