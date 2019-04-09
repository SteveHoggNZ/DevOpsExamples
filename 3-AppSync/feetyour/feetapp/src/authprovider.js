import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'
import Auth from '@aws-amplify/auth'

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    return Promise.resolve()
  }
  if (type === AUTH_LOGOUT) {
    return Auth.signOut({ global: false })
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve()
  }
  if (type === AUTH_CHECK) {
    // called when the user navigates to a new location
    return Auth.currentAuthenticatedUser()
  }
  return Promise.reject('Unknown authProvider method')
}
