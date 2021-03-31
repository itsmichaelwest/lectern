import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import VideoPlayer from '../components/atoms/video/VideoPlayer'
import VideoComments from '../components/atoms/video/VideoComments'
import VideoInformation from '../components/atoms/video/VideoInformation'
import { Helmet } from 'react-helmet'
import Hls from 'hls.js'
import VideoSkeleton from '../components/skeletons/VideoSkeleton'

export default class Video extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoaded: false,
            videoId: null,
            title: '',
            description: null,
            streamUrl: null,
            author: null,
            views: null,
            authorDisplayName: null
        }
    }

    componentDidMount () {
        const params = this.props.match.params

        // Get all video information
        axios
        .get(config.apiUrl + '/api/v1/video/' + params.videoId)
        .then(response => {
            console.log(response)
            this.setState({
                isLoaded: true,
                videoId: response.data[0].videoId,
                title: response.data[0].title,
                description: response.data[0].description,
                likes: response.data[0].likes,
                dislikes: response.data[0].dislikes,
                streamUrl: response.data[0].streamUrl,
                author: response.data[0].author,
                views: response.data[0].views,
                authorDisplayName: response.data[1].displayName
            })
            axios
            .get(`${config.apiUrl}/auth/user/id`)
            .then(response => {
                if (response.data === this.state.author) {
                    this.setState({
                        isCreator: true
                    })
                }
            })
        })
        .catch(err => {
            console.error(err)
        })

        // Adds a view to the video
        axios.post(`${config.apiUrl}/api/v1/video/${params.videoId}/view`)

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
        const { isLoaded, title, description, likes, dislikes, author, views, authorDisplayName, isCreator } = this.state

        return (
            <>
            <Helmet>
                <title>{`${title} | Lectern`}</title>
            </Helmet>
            <div>
                {isLoaded ? 
                <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <VideoPlayer className="sticky" />
                    <VideoComments/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <VideoInformation 
                        id={author}
                        title={title} 
                        description={description}
                        views={views}
                        date="January 10, 2021"
                        channelName={authorDisplayName}
                        subscribers="20"
                        isCreator={isCreator}
                    />
                </div>
                </>
                :
                <VideoSkeleton/>
                }
            </div>
            </>
        )
    }
}
