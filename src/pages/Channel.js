import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import Thumbnail from '../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'
import NotFound from '../pages/NotFound'
import ChannelHeader from '../components/atoms/channel/ChannelHeader'
import { Button, ButtonDestructive, URL } from '../Design'
import Dialog from '../components/Dialog'
import VideoRowSkeleton from '../components/skeletons/VideoRowSkeleton'

// Channel page
export default class Channel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: this.props.match.params.channelId,
            name: '',
            avatar: null,
            videos: null,
            notFound: false,
            isDestroyable: false,
            showDestroyModal: false
        }
    }

    // Get channel information and videos from the API.
    componentDidMount () {
        axios
        .get(`${config.apiUrl}/api/v1/channel/${this.state.id}/all`)
        .then(res => {
            if (res.data[0].channelPhoto) {
                let avatarBase64 = new Buffer.from(res.data[0].channelPhoto, 'base64').toString('ascii')
                this.setState({
                    avatar: avatarBase64
                })
            }
            this.setState({
                name: res.data[0].displayName,
                videos: res.data[1],
            })

            // Run an auth check to see if the user can delete their data
            // from this page.
            axios
            .get(`${config.apiUrl}/auth/user`)
            .then(res => {
                if (res.data.passport.user.oid === this.state.id) {
                    this.setState({
                        isDestroyable: true
                    })
                }
            })
        })
        .catch(err => {
            console.error(err)
            this.setState({
                notFound: true
            })
        })
    }

    // Toggle the delete data dialog.
    toggleDestroyModal = () => {
        this.setState({
            showDestroyModal: !this.state.showDestroyModal
        })
    }

    // Delete the user's data.
    destroyUser = () => {
        window.location.replace('/auth/destroy')
    }

    render () {
        const { name, avatar, videos, isDestroyable } = this.state

        if (!this.state.notFound) {
            return (
                <>
                <Helmet>
                    <title>{`${name} | Lectern`}</title>
                </Helmet>
                <Dialog 
                    show={this.state.showDestroyModal} 
                    onPrimary={this.destroyUser}
                    onClose={this.toggleDestroyModal}
                    primaryStyle={ButtonDestructive}
                    primary="Delete data"
                    secondary="Cancel"
                    secondaryStyle={Button}>
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
                        <a className={URL} href="https://docs.microsoft.com/en-us/azure/active-directory/user-help/my-applications-portal-permissions-saved-accounts">
                            Click here for information on removing permissions from your Microsoft 365 account
                        </a>
                    </p>
                </Dialog>
                <div className="px-4 sm:px-0">
                    <ChannelHeader 
                        name={name} 
                        avatar={avatar}
                        isDestroyable={isDestroyable}
                        destroyModal={this.toggleDestroyModal} />
                    { videos 
                        ? 
                        <div className="mt-16">
                            <h2 className="font-bold dark:text-white font-header text-2xl mb-8">
                                Videos
                            </h2>
                            { videos.length >= 1 ?
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map(video => {
                                    return (
                                        <Thumbnail 
                                            key={video.videoId} 
                                            id={video.videoId} 
                                            title={video.title} 
                                            description={video.description}
                                            length={video.length}
                                            thumb={video.thumbnail}
                                        />
                                    )
                                })}
                            </div>
                            :
                            <p>
                                It looks like {name.substr(0, name.indexOf(" "))} hasn't posted any videos yet.
                            </p>
                            }
                        </div>
                        :
                        <div>
                            <VideoRowSkeleton/>
                        </div>
                    }
                </div>
                </>
            )
        } else {
            return (
                <NotFound/>
            )
        }
    }
}
