import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Design from '../designSystem'
import UploadVideo from '../functions/video/upload'
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadStatus: false,
            selectedFile: null
        }
    }

    componentDidMount () {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(response => {
            console.log(`**(Upload) User is logged...`)
            this.setState({
                auth: true
            })
        })
        .catch(err => {
            console.error(err)
            localStorage.removeItem('user')
            window.location.replace('/login')
        })
    }

    handleFileSelection = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleUploadPress = () => {
        UploadVideo(this.state.selectedFile)
    }

    render () {
        return (
            <>
            <Helmet>
                <title>Upload Video | Lectern</title>
            </Helmet>
            <div>
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold mt-16 mb-8">Upload Video</h1>
                        <p>By uploading a video, you agree to the <Link className="text-primary-600 hover:text-primary-900">Terms of Service</Link>.</p>
                    </div>
                    <input className="block my-4" type="file" name="video" onChange={this.handleFileSelection} />
                    <button className={Design.button} onClick={this.handleUploadPress}>Upload</button>
                </div>
                :
                <>
                </>
                }
            </div>
            </>
        )
    }
}
