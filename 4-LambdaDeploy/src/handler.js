export const getVersion = async (event, context, callback) => {
  try {
    const { version } = require('../package.json')
    callback(null, { version })
  } catch (e) {
    console.error(e)
    callback(e)
  }
}
