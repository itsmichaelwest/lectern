import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import ContentLoader from 'react-content-loader'
export default class Profile extends Component {
    constructor (props) {
            super(props)

            this.state = {
                auth: false,
                loginName: null,
                displayName: null,
                provider: null,
                id: null
            }
    }

    componentDidMount () {
            axios
            .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
            .then(response => {
                console.log(`**(Profile) User is logged...`)
                console.log(response)
                this.setState({
                    auth: true,
                    loginName: response.data.user._json.displayName,
                    displayName: response.data.user.displayName,
                    provider: 'microsoft',
                    id: response.data.user.oid
                })
            })
            .catch(() => {
                localStorage.removeItem('user')
                window.location.replace('/#/login')
            })
    }

    render () {
        const isAuth = this.state.auth
        let page
        if (isAuth)
            page = LoggedIn(this.state)
        else
            page = LoggedOut

        return (
            <>
            <Helmet>
                <title>User Profile | CS394</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-bold mb-8">User Profile</h1>
                {page}
            </div>
            </>
        )
    }
}

function LoggedOut(props) {
    return (
        <ContentLoader className="h-64">
        <rect x="0" y="2" width="300" height="20" />
        <rect x="0" y="26" width="300" height="20" />
        <rect x="0" y="50" width="300" height="20" />
        <rect x="0" y="74" width="300" height="20" />
        <rect x="0" y="116" width="96" height="42" />
        </ContentLoader>
    )
}

function LoggedIn(state) {
    return (
        <div>
        <p>Authenticated with: {state.provider}</p>
        <p>Name: {state.displayName}</p>
        <p>E-mail: {state.loginName}</p>
        <p>ID: {state.id}</p>
        <a href="/auth/logout" className="mt-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700">
            Sign out
        </a>
        </div>
    )
}