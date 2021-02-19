import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'
import logoutUser from '../functions/logoutUser'

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loginName: null,
      displayName: null,
      provider: null,
      id: null
    }
  }

  componentWillMount () {
    console.log(`**(Profile) Loading user details from the server...`)

    axios
      .get(config.apiUrl + '/auth/user')
      .then(response => {
        console.log(`**(Profile) User is logged...`)
        console.log(response)
        this.setState({
          loginName: response.data.user._json.displayName,
          displayName: response.data.user.displayName,
          provider: 'microsoft',
          id: response.data.user.oid
        })
      })
      .catch(err => {
        console.log(
          `**(Profile) User is not logged. Redirecting to login page...`
        )
        console.log(err)
        localStorage.removeItem('user')
        window.location.href = '/#/login'
      })
  }

  render () {
    const { displayName, loginName, id, provider } = this.state
    return (
      <div>
        <h3>User Profile</h3>
        <p>Authenticated with: {provider}</p>
        <p>Name: {displayName}</p>
        <p>E-mail: {loginName}</p>
        <p>ID: {id}</p>
        <br />
        <button onClick={logoutUser}>
            Logout
        </button>
      </div>
    )
  }
}
