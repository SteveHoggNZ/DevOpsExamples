export const get = async (event, context, callback) => {
  try {
    const version = process.env.VERSION
    callback(null, { version })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}

export const getViaAPI = async (event, context, callback) => {
  try {
    const version = process.env.VERSION
    const response = {
      statusCode: 200,
      body: JSON.stringify({ version })
    }
    callback(null, response)
  } catch (e) {
    console.error(e)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    }
    callback(null, response)
  }
}
