import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Dialog from '../components/Dialog'
import design from '../designSystem'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
export default class Profile extends Component {
    constructor (props) {
        super(props)
        this.state = {
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
        const { displayName, loginName } = this.state

        return (
            <>
            <Helmet>
                <title>Your Profile | Lectern</title>
            </Helmet>
            <div>
                {displayName ?
                    <>
                    <Dialog onClose={this.toggleDestroyModal} show={this.state.showDestroyModal} destroyUser={this.destroyUser}>
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
                            <a className={design.href} href="https://docs.microsoft.com/en-us/azure/active-directory/user-help/my-applications-portal-permissions-saved-accounts">Revoking permissions from Microsoft 365 account</a>
                        </p>
                    </Dialog>
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Hello, {displayName}
                    </h1>
                    <p className="text-center">
                        E-mail: {loginName}
                    </p>
                    <div className="mt-4 mx-auto w-max">
                        <button onClick={this.toggleDestroyModal} className="ml-2 inline-block rounded-md border border-red-500 shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-gray-100 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500">
                            Delete my data
                        </button>
                    </div>
                    </>
                    :
                    <ProfileSkeleton/>
                }
            </div>
            </>
        )
    }
}