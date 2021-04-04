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
            .get(`${config.apiUrl}/api/v1/channel/${res.data.passport.user.oid}/videos`)
            .then(response => {
                this.setState({
                    videos: response.data
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
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Hello, {displayName}
                    </h1>
                    <p className="text-center">
                        E-mail: {loginName}
                    </p>
                    <div className="mt-4 mx-auto w-max">
                        <button onClick={this.toggleDestroyModal} className={Design.ButtonDestructive}>
                            Delete my data
                        </button>
                    </div>
                    </>
                    :
                    <ProfileSkeleton/>
                }
                <div className="mt-8">
                    <h2 className="font-bold text-lg">
                        Your videos
                    </h2>
                    {
                        this.state.videos ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">                    
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