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
            videoId: null,
            title: null,
            description: null,
            likes: null,
            dislikes: null,
            streamUrl: null,
            author: null
        }
    }

    componentDidMount () {
        console.log(`**(Video) Loading video details from the server...`)

        const params = this.props.match.params

        axios
        .get(config.apiUrl + '/api/v1/video/' + params.videoId)
        .then(response => {
            console.log(response)
            this.setState({
                videoId: response.data.videoId,
                title: response.data.title,
                description: response.data.description,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
                streamUrl: response.data.streamUrl,
                author: response.data.author
            })
        })
        .catch(err => {
            console.error(err)
        })

        var video = document.getElementById('video')
    
        /*
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(this.state.streamUrl);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = this.state.streamUrl
        }*/
    }

    render () {
        const { title, description, likes, dislikes, author } = this.state

        return (
            <>
            <Helmet>
                <title>{`${title} | Lectern`}</title>
            </Helmet>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <VideoPlayer />
                    <VideoComments/>
                </div>
                <VideoInformation 
                    id={author}
                    title={title} 
                    description={description}
                    views="16 views"
                    date="January 10, 2021"
                    channelName={author}
                    subscribers="20"
                />
            </div>
            </>
        )
    }
}
