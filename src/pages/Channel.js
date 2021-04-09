import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import Thumbnail from '../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'
import ChannelSkeleton from '../components/skeletons/ChannelSkeleton'
import NotFound from '../pages/NotFound'
import VideoRowSkeleton from '../components/skeletons/VideoRowSkeleton'
import Comment from '../components/atoms/comment/Comment'

export default class Channel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            channelId: this.props.match.params.channelId,
            channelName: '',
            videos: [],
            comments: []
        }
    }

    componentDidMount () {
        const params = this.props.match.params

        axios
        .get(`${config.apiUrl}/api/v1/channel/${params.channelId}/all`)
        .then(res => {
            let buffer = new Buffer(res.data[0].channelPhoto, 'base64')
            let text = buffer.toString('ascii')
            this.setState({
                channelName: res.data[0].displayName,
                channelSubscribers: res.data[0].followers,
                channelPhoto: text,
                videos: res.data[1],
                comments: res.data[2]
            })
        })
        .catch(err => {
            console.error(err)
            this.setState({
                notFound: true
            })
        })
    }

    render () {
        const { channelName, videos, comments } = this.state

        if (!this.state.notFound) {
            return (
                <>
                <Helmet>
                    <title>{`${channelName} | Lectern`}</title>
                </Helmet>
                <div className="px-4 sm:px-0">
                    {channelName ?
                    <div className="relative bg-black bg-opacity-40 rounded-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row items-center relative p-8">
                            <div className="flex flex-col lg:flex-row items-center flex-auto">
                                <img className="flex-initial flex-shrink-0 rounded-full overflow-hidden bg-gray-200 h-32 w-32 shadow-lg lg:mr-8" src={`data:image/jpeg;base64,${this.state.channelPhoto}`} />
                                <div className="flex-auto">
                                    <h1 className="font-bold font-header text-white text-3xl my-4 lg:my-0">{channelName}</h1>
                                </div>
                            </div>
                        </div>
                        <img className="absolute inset-0 bg-gray-100 w-full transform -translate-y-1/2" src={`data:image/jpeg;base64,${this.state.channelPhoto}`} style={{ zIndex: '-1', filter: 'blur(100px)' }} />
                    </div>
                    :
                    <ChannelSkeleton/>
                    }
                    <div className="mt-8">
                        <h2 className="font-bold font-header text-lg mb-4">
                            Videos
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map(video => {
                            return (
                                <Thumbnail 
                                    key={video.videoId} 
                                    id={video.videoId} 
                                    length="" 
                                    title={video.title} 
                                    description={video.description} />
                            )
                        })}
                        </div>
                    </div>
                    <div className="mt-16">
                        <h2 className="font-bold font-header text-lg mb-4">
                            Recent comments
                        </h2>
                        <div className="flex flex-col border rounded-xl shadow-sm divide-y overflow-hidden">
                            <div className="h-full max-h-96 overflow-y-scroll">
                            {comments.map(comment => {
                                return (
                                    <Comment
                                        key={comment.commentId}
                                        time="00:00"
                                        author={comment.author}
                                        name={comment.authorDisplayName}
                                        content={comment.comment}
                                    />
                                )
                            })}
                            </div>
                        </div>
                    </div>
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
