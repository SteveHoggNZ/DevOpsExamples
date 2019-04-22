export const getTenants = async (event, context, callback) => {
  try {
    const tenantsJSON = JSON.stringify([
      'Customer 1',
      'Customer 2'
    ])
    const result = {
      ...event,
      response: {
        ...event.response,
        claimsOverrideDetails: {
          claimsToAddOrOverride: {
            tenantsJSON
          }
        }
      }
    }
    callback(null, result)
  } catch (e) {
    console.error(e)
    callback(e)
  }
}
