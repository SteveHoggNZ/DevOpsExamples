import * as images from './lib/images'

export const list = async (event, context, callback) => {
  try {
    const list = await images.list()
    callback(null, { list })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}