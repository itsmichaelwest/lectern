import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import Thumbnail from '../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'
import ChannelSkeleton from '../components/skeletons/ChannelSkeleton'

export default class Channel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            channelId: this.props.match.params.channelId,
            channelName: '',
            channelSubscribers: null,
            videos: null
        }
    }

    componentDidMount () {
        const params = this.props.match.params

        axios
        .get(`${config.apiUrl}/api/v1/channel/${params.channelId}/all`)
        .then(response => {
            this.setState({
                channelName: response.data[0].displayName,
                channelSubscribers: response.data[0].followers,
                videos: response.data[1]
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    render () {
        const { channelName, videos } = this.state

        return (
            <>
            <Helmet>
                <title>{`${channelName} | Lectern`}</title>
            </Helmet>
            <div>
                {channelName ?
                <div className="bg-primary-900 rounded-xl">
                    <div className="flex flex-col lg:flex-row items-center relative p-8">
                        <div className="flex flex-col lg:flex-row items-center flex-auto">
                            <div className="flex-initial flex-shrink-0 rounded-full bg-white h-32 w-32 shadow-lg lg:mr-8">
                                {/* put an image here ok */}
                            </div>
                            <div className="flex-auto text-white">
                                <h1 className="font-bold text-2xl my-4 lg:my-0">{channelName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <ChannelSkeleton/>
                }
                { videos &&
                    <div className="mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map(video => {
                            return (
                                <Thumbnail key={video.videoId} id={video.videoId} length="" title={video.title} description={video.description} />
                            )
                        })}
                        </div>
                    </div>
                }
            </div>
            </>
        )
    }
}
