import config from '../config'
import axios from 'axios'

export default function logoutUser() {
  console.log('Logging out user...')
  localStorage.removeItem('user')

  axios
    .get(config.apiUrl + '/auth/logout')
    .then(response => {
        window.location.href = '/#/login'
    })
    .catch(() => {
        window.location.href = '/#/login'
    })

  /// function logoutDone () { }
}
