import React from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Design from '../Design'
import { Link, Prompt } from 'react-router-dom'
import UploadSkeleton from '../components/skeletons/UploadSkeleton'
import Thumbnail from '../components/atoms/video/Thumbnail'
import UploadForm from '../components/UploadForm'

export default class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            uploadStatus: false,
            selectedFile: null
        })
    }

    componentDidMount () {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(() => {
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

    // Warn user that their changes won't be
    componentDidUpdate = () => {
        if (this.state.selectedFile) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    render () {
        return (
            <>
            <Prompt
                when={this.state.selectedFile !== null}
                message='Leave page? This video won&apos;t be uploaded' />
            <Helmet>
                <title>Upload Video | Lectern</title>
            </Helmet>
            <div className="px-4 sm:px-0">
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl dark:text-white font-bold font-header mt-16 mb-8">Upload Video</h1>
                        <p className="dark:text-gray-100">By uploading a video, you agree to our <Link to="/community-standards" className={Design.URL}>Community Standards</Link>.</p>
                    </div>
                    { !this.state.uploadStatus ? 
                    <UploadForm
                        setUploadStatus={
                            callback => this.setState({
                                uploadStatus: callback
                            })
                        }
                        selectedFile={this.state.selectedFile}
                        setSelectedFile={
                            file => this.setState({
                                selectedFile: file
                            })
                        }/>
                    :
                    <div className="text-center">
                        <div className="lg:w-3/6 md:w-4/6 w-full mx-auto">
                            <Thumbnail 
                                key={this.state.uploadStatus.videoId} 
                                id={this.state.uploadStatus.videoId} 
                                title={this.state.uploadStatus.title} 
                                description={this.state.uploadStatus.description}
                                length={Math.round(this.state.uploadStatus.vidLength)}
                                thumb={this.state.uploadStatus.thumbnail}
                            />
                        </div>
                        <p className="text-xl mt-8">
                            🎉 Your video was successfully uploaded! ✨
                        </p>
                    </div>
                    }
                </div>
                :
                <UploadSkeleton />
                }
            </div>
            <div className="fixed top-0 left-0 invisible">
                {/* hidden div used to capture video thumbnail */}
                <video id="tempVideo" width="640" height="360"/>
            </div>
            </>
        )
    }
}
