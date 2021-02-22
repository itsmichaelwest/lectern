import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'
import { Helmet } from 'react-helmet'

import ContentLoader from 'react-content-loader'

import { FileDrop } from 'react-file-drop'

import UploadVideo from '../functions/video/upload'

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

    componentDidMount () {
        console.log(`**(Profile) Loading user details from the server...`)
    
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
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
        const MyLoader = () => (
            <ContentLoader viewBox="0 0 380 70">
                {/* Only SVG shapes */}    
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
        )

        const { displayName, loginName, id, provider } = this.state
        return (
            <>
            <Helmet>
                <title>Upload Video | CS394</title>
            </Helmet>
            <div>
                <MyLoader />
                <h1 className="text-2xl font-bold mb-8">Upload Video</h1>
                <div className="w-full md:w-3/5 h-64 my-8 rounded-xl border border-yellow-500 hover:border-yellow-700 hover:bg-gray-100 hover:shadow-lg transition-all">
                    <FileDrop
                        className="w-full h-full"
                        targetClassName="flex items-center w-full h-full"
                        onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                        onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                        onFrameDrop={(event) => console.log('onFrameDrop', event)}
                        onDragOver={(event) => console.log('onDragOver', event)}
                        onDragLeave={(event) => console.log('onDragLeave', event)}
                        onDrop={(files, event) => UploadVideo(files)}>
                        <p className="text-sm my-auto mx-auto">
                            Drag to upload...
                        </p>
                    </FileDrop>
                </div>

                <p>Authenticated with: {provider}</p>
                <p>Name: {displayName}</p>
                <p>E-mail: {loginName}</p>
                <p>ID: {id}</p>
            </div>
            </>
        )
    }
}
