import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'
import VideoPlayer from '../components/video/VideoPlayer'
import VideoComments from '../components/video/VideoComments'
import VideoInformation from '../components/video/VideoInformation'
import { Helmet } from 'react-helmet'

export default class Video extends Component {
    constructor (props) {
        super(props)

        this.state = {
            videoId: 'Unauthenticated'
        }
    }

    componentDidMount () {
        console.log(`**(Video) Loading video details from the server...`)

        const params = this.props.match.params

        axios
        .get(config.apiUrl + '/api/v1/video/' + params.videoId)
        .then(response => {
            console.log(`**(Video) User is logged...`)
            this.setState({
            videoId: response.data
            })
        })
        .catch(err => {
            console.log(
            `**(Video) User is not logged.`
            )
        })
    }

    render () {
        const { videoId } = this.state

        return (
            <>
            <Helmet>
                <title>{`${videoId} | CS394`}</title>
            </Helmet>
            <div>
                <p>Video ID: {videoId}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <VideoPlayer/>
                    <VideoComments/>
                </div>
                <VideoInformation 
                    id={videoId}
                    title="Test" 
                    description="Test" 
                    views="1234"
                    date="1234"
                    channelName="BOB"
                    subscribers="2145"
                />
            </div>
            </>
        )
    }
}
