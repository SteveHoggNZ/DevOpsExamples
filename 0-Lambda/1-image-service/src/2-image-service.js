import uuid from 'uuid4'
import * as images from './lib/images'

let id

export const process = async (event, context, callback) => {
  try {
    if (!id) {
      id = uuid()
    }
    console.log('LAMBDA ID', id)
    console.log('PROCESS EVENT', JSON.stringify(event))
    callback(null, { status: 'ok' })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}

export const list = async (event, context, callback) => {
  try {
    const list = await images.list()
    const response = {
      statusCode: 200,
      body: JSON.stringify({ list })
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
