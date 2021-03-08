import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import MSFTSignInButton from '../vectors/msft-sign-in.svg'

export default class Login extends Component {
    loginToADFS (e) {
        e.preventDefault()
        window.location = '/auth/microsoft'
    }

    render () {
        return (
            <>
            <Helmet>
                <title>Sign in | Lectern</title>
            </Helmet>
            <div className="max-w-md mx-auto my-auto">
                <h1 className="text-xl font-bold mb-4">
                    Log in to CS394
                </h1>
                <p className="mb-4">
                    Use your Microsoft 365 account to sign in
                </p>
                <button onClick={this.loginToADFS.bind(this)}>
                    <img src={MSFTSignInButton} alt='Sign in with Microsoft' />
                </button>{' '}
            </div>
            </>
        )
    }
}
