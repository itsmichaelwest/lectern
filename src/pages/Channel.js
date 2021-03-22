import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import Thumbnail from '../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'

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
                <>
                <div className="shimmer rounded-xl">
                    <div className="flex flex-col lg:flex-row items-center relative p-8">
                        <div className="flex flex-col lg:flex-row items-center flex-auto">
                            <div className="shimmer-darker flex-initial flex-shrink-0 rounded-full h-32 w-32 lg:mr-8"></div>
                            <div className="shimmer-darker flex-initial my-4 lg:my-0 max-w-64 w-64 h-8 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <div>
                        <div className="shimmer rounded-lg mb-2" style={{ height: 0, paddingBottom: '56.25%' }}></div>
                        <div className="shimmer rounded w-3/5 my-1" style={{ height: '18px' }}></div>
                        <div className="shimmer rounded w-4/5 h-5"></div>
                    </div>
                    <div>
                        <div className="shimmer rounded-lg mb-2" style={{ height: 0, paddingBottom: '56.25%' }}></div>
                        <div className="shimmer rounded w-3/5 my-1" style={{ height: '18px' }}></div>
                        <div className="shimmer rounded w-4/5 h-5"></div>
                    </div>
                    <div>
                        <div className="shimmer rounded-lg mb-2" style={{ height: 0, paddingBottom: '56.25%' }}></div>
                        <div className="shimmer rounded w-3/5 my-1" style={{ height: '18px' }}></div>
                        <div className="shimmer rounded w-4/5 h-5"></div>
                    </div>
                </div>
                </>
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
