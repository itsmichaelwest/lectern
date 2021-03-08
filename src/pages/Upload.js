import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import { FileDrop } from 'react-file-drop'
import { Formik } from 'formik'
import Design from '../designSystem'
import UploadVideo from '../functions/video/upload'
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadStatus: false
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

    render () {
        return (
            <>
            <Helmet>
                <title>Upload Video | CS394</title>
            </Helmet>
            <div>
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold mt-16 mb-8">Upload Video</h1>
                        <p>By uploading a video, you agree to the <Link className="text-primary-600 hover:text-primary-900">Terms of Service</Link>.</p>
                    </div>
                    <div className="w-full md:w-3/5 h-64 mx-auto my-8 rounded-xl border-2 border-dashed border-primary-500 hover:border-primary-700 hover:bg-gray-100 transition-all">
                        <FileDrop
                            className="w-full h-full"
                            targetClassName="flex items-center w-full h-full"
                            onDrop={(files, event) => UploadVideo(files, event)}>
                            <div className="text-md text-center my-auto mx-auto">
                                <p>
                                    Drag to upload
                                </p>
                                <p className="text-sm my-1">
                                    Acceptable file types: MP4
                                </p>
                            </div>
                        </FileDrop>
                    </div>
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
