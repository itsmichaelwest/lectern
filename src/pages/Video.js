import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'
import VideoPlayer from '../components/VideoPlayer'
import VideoComments from '../components/VideoComments'

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
            <div>
                <p>Video ID: {videoId}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <VideoPlayer/>
                    <VideoComments/>
                </div>
                <h1 className="text-3xl font-bold my-2">This is the video title</h1>
                <p>This is a description area.</p>
            </div>
        )
    }
}
