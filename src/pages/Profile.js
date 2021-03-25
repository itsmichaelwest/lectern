import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Dialog from '../components/Dialog'
import Design from '../Design'
export default class Profile extends Component {
    constructor (props) {
        super(props)
        this.state = {
            auth: false,
            loginName: null,
            displayName: null,
            id: null,
            showDestroyModal: false,
            videos: null
        }
    }

    componentDidMount () {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(response => {
            this.setState({
                auth: true,
                loginName: response.data.passport.user._json.email,
                displayName: response.data.passport.user.displayName,
                id: response.data.passport.user.oid
            })
        })
        .catch(err => {
            console.error(err)
            localStorage.removeItem('user')
            window.location.replace('/login')
        })
    }

    toggleDestroyModal = () => {
        this.setState({
            showDestroyModal: !this.state.showDestroyModal
        });
    }

    destroyUser = () => {
        window.location.replace('/auth/destroy')
    }

    render () {
        const isAuth = this.state.auth
        let page
        if (isAuth)
            page = LoggedIn(this.state, this.toggleDestroyModal)
        else
            page = LoggedOut

        return (
            <>
            <Helmet>
                <title>Your Profile | Lectern</title>
            </Helmet>
            <div>
                <Dialog 
                    show={this.state.showDestroyModal} 
                    onPrimary={this.destroyUser}
                    onClose={this.toggleDestroyModal}
                    primaryStyle={Design.ButtonDestructive}
                    primary="Delete data"
                    secondary="Cancel"
                    secondaryStyle={Design.Button}
                >
                    <h4 className="font-bold text-lg">
                        Delete my data
                    </h4>
                    <p className="my-2">
                        Delete all your data from Lectern? This will remove:
                    </p>
                    <ul className="pl-4 list-disc">
                        <li>Your public profile</li>
                        <li>Any videos you have uploaded</li>
                        <li>Comments you have posted on videos</li>
                    </ul>
                    <p className="my-2">
                        You will be logged out. You can de-authorize Lectern from your account provider by following these instructions:
                    </p>
                    <p className="my-2">
                        <a className={Design.URL} href="https://docs.microsoft.com/en-us/azure/active-directory/user-help/my-applications-portal-permissions-saved-accounts">Revoking permissions from Microsoft 365 account</a>
                    </p>
                </Dialog>
                {page}
            </div>
            </>
        )
    }
}

function LoggedOut(props) {
    return (
        <>
        <h1 className="text-2xl font-bold mb-8">User Profile</h1>
        </>
    )
}

function LoggedIn(state, toggleDestroyModal) {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">
                Hello, {state.displayName}
            </h1>
            <p className="text-center">
                E-mail: {state.loginName}
            </p>
            <div className="mt-4 mx-auto w-max">
                <button onClick={toggleDestroyModal} className={Design.ButtonDestructive}>
                    Delete my data
                </button>
            </div>
        </div>
    )
}