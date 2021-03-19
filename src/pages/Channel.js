import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'

import Design from '../designSystem'
import Thumbnail from '../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'

import ContentLoader from 'react-content-loader'

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
        .get(`${config.apiUrl}/api/v1/channel/${params.channelId}`)
        .then(response => {
            console.log(response)
            this.setState({
                channelName: response.data.displayName,
                channelSubscribers: response.data.followers
            })
        })
        .catch(err => {
            console.error(err)
        })

        axios
        .get(`${config.apiUrl}/api/v1/channel/${params.channelId}/videos`)
        .then(response => {
            console.log(response)
            this.setState({
                videos: response.data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }

    render () {
        const { channelName, channelSubscribers, videos } = this.state

        return (
            <>
            <Helmet>
                <title>{`${channelName} | Lectern`}</title>
            </Helmet>
            <div>
                <ContentLoader style={{ width: '100%', height: '100vh' }}>
                    <rect x="0" y="0" rx="12" ry="12" width={"100vw"} height={"192px"} />
                    <rect x="0" y="224" rx="8" ry="8" width={"calc(100vw / 3)"} height={"260px"} />
                </ContentLoader>
                <div className="bg-primary-900 rounded-xl">
                    <div className="flex flex-col lg:flex-row items-center relative p-8">
                        <div className="flex flex-col lg:flex-row items-center flex-auto">
                            <div className="flex-initial flex-shrink-0 rounded-full bg-white h-32 w-32 shadow-lg mr-8">
                                {/* put an image here ok */}
                            </div>
                            <div className="flex-auto text-white">
                                <h1 className="font-bold text-2xl my-4 lg:my-0">{channelName}</h1>
                            </div>
                        </div>
                        <div className="float-right flex-initial flex flex-row items-center">
                            <div className="mr-4 text-white">
                                {channelSubscribers} subscribers
                            </div>
                            <button className={Design.pButton}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
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
