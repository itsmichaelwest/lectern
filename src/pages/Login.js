import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Design from '../Design'
import { ReactComponent as MSFTSignInButton } from '../vectors/msft-sign-in.svg'

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
                <p>
                    Use your Microsoft 365 account to sign in.
                </p>
                <button className={Design.Button + " my-4"} onClick={this.loginToADFS.bind(this)}>
                    <MSFTSignInButton alt="Sign in with Microsoft" />
                </button>
                <p>
                    By signing in, you agree to the <Link to="/privacy" className={Design.URL}>Privacy Policy</Link> and <Link to="/participation" className={Design.URL}>Participation Agreement</Link>.
                </p>
            </div>
            </>
        )
    }
}
