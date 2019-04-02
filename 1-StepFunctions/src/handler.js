import * as welcome from './lib/welcome'

export const getWelcome = async (event, context, callback) => {
  try {
    const message = welcome.get()
    callback(null, { message })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}

export const getWelcomeHttp = async (event, context, callback) => {
  try {
    const message = welcome.get()
    callback(null, { statusCode: 200, body: JSON.stringify({ message }) })
  } catch (e) {
    console.error(e)
    const { statusCode, message: error } = e
    callback(null, { statusCode, body: JSON.stringify({ error }) })
  }
}
