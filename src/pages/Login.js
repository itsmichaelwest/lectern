import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Design from '../Design'
import { ReactComponent as MSFTSignInButton } from '../vectors/msft-sign-in.svg'

// Login page
export default class Login extends React.Component {
    // Redirect to Microsoft 365 authentication.
    loginToADFS (event) {
        event.preventDefault()
        window.location = '/auth/microsoft'
    }

    render () {
        return (
            <>
            <Helmet>
                <title>Sign in | Lectern</title>
            </Helmet>
            <div className="max-w-md mx-auto my-auto text-center">
                <h1 className="text-2xl dark:text-white font-bold mb-4">
                    Sign in to Lectern
                </h1>
                <p className="text-gray-900 dark:text-gray-100">
                    Use your Microsoft 365 account to sign in.
                </p>
                <button className={Design.Button + " my-4"} onClick={this.loginToADFS.bind(this)}>
                    <MSFTSignInButton alt="Sign in with Microsoft" id="MSSignInButton" />
                </button>
                <p className="text-gray-900 dark:text-gray-100">
                    By signing in, you agree to the <Link to="/privacy" className={Design.URL}>Privacy Policy</Link> and <Link to="/participation" className={Design.URL}>Participation Agreement</Link>.
                </p>
            </div>
            </>
        )
    }
}
