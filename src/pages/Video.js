import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import VideoPlayer from '../components/atoms/video/VideoPlayer'
import VideoComments from '../components/atoms/video/VideoComments'
import VideoInformation from '../components/atoms/video/VideoInformation'
import { Helmet } from 'react-helmet'
import Hls from 'hls.js'

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

        var video = document.getElementById('video')
        var videoSrc = 'https://aucs39440mediatest-ukso1.streaming.media.azure.net/89710c1a-8226-43cb-a842-c4a29abc0b5a/2BDGpizugSe_mrNe.ism/manifest(format=m3u8-aapl)'
    
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoSrc
        }
    }

    render () {
        const { videoId } = this.state

        return (
            <>
            <Helmet>
                <title>{`${videoId} | Lectern`}</title>
            </Helmet>
            <div>
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
