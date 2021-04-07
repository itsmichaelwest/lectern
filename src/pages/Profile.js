import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Dialog from '../components/Dialog'
import Design from '../Design'
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton'
import Thumbnail from '../components/atoms/video/Thumbnail'
import VideoRowSkeleton from '../components/skeletons/VideoRowSkeleton'
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
        .then(res => {
            console.log(res)
            this.setState({
                loginName: res.data.passport.user._json.email,
                displayName: res.data.userName,
                id: res.data.passport.user.oid
            })
            axios
            .get(`${config.apiUrl}/api/v1/channel/${res.data.passport.user.oid}/all`)
            .then(response => {
                let buffer = new Buffer(response.data[0].channelPhoto, 'base64')
                let text = buffer.toString('ascii')
                this.setState({
                    channelPhoto: text,
                    videos: response.data[1]
                })
            })
            .catch(err => {
                console.error(err)
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
        })
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
            <div className="px-4 sm:px-0">
                {
                    displayName ?
                    <>
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
                    <div className="relative bg-black bg-opacity-40 rounded-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row items-center relative p-8">
                            <div className="flex flex-col lg:flex-row items-center flex-auto">
                                <img className="flex-initial flex-shrink-0 rounded-full overflow-hidden bg-gray-200 h-32 w-32 shadow-lg lg:mr-8" src={`data:image/jpeg;base64,${this.state.channelPhoto}`} />
                                <div className="flex-auto text-center md:text-left">
                                    <h1 className="font-bold font-header text-white text-3xl my-4 lg:my-0">{displayName}</h1>
                                    <button onClick={this.toggleDestroyModal} className={Design.ButtonDestructive + " -mt-2 md:mt-2"}>
                                        Delete my data
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img className="absolute inset-0 bg-gray-100 w-full transform -translate-y-1/2" src={`data:image/jpeg;base64,${this.state.channelPhoto}`} style={{ zIndex: '-1', filter: 'blur(100px)' }} />
                    </div>
                    </>
                    :
                    <ProfileSkeleton/>
                }
                <div className="mt-8">
                    <h2 className="font-bold font-header text-lg">
                        Your videos
                    </h2>
                    {
                        this.state.videos ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">                    
                            {this.state.videos.map(video => {
                                return (
                                    <Thumbnail 
                                        key={video.videoId} 
                                        id={video.videoId} 
                                        title={video.title} 
                                        description={video.description} 
                                    />
                                )
                            })}
                        </div>
                        :
                        <VideoRowSkeleton/>
                    }
                </div>
            </div>
            </>
        )
    }
}