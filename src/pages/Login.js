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
            <div className="max-w-md mx-auto my-auto text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Sign in to Lectern
                </h1>
                <p className="mb-4 text-left">
                    Use your Microsoft 365 account to sign in. More login providers are coming soon.
                </p>
                <button className="inline-block justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500" onClick={this.loginToADFS.bind(this)}>
                    <img src={MSFTSignInButton} alt='Sign in with Microsoft' />
                </button>
            </div>
            </>
        )
    }
}
