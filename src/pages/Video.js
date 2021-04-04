import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import VideoPlayer from '../components/atoms/video/VideoPlayer'
import VideoComments from '../components/atoms/video/VideoComments'
import VideoInformation from '../components/atoms/video/VideoInformation'
import { Helmet } from 'react-helmet'
import Hls from 'hls.js'
import VideoSkeleton from '../components/skeletons/VideoSkeleton'
import NotFound from '../pages/NotFound'

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
            this.setState({
                isLoaded: true,
                videoId: response.data[0].videoId,
                title: response.data[0].title,
                description: response.data[0].description,
                streamUrl: response.data[0].streamUrl,
                author: response.data[0].author,
                views: response.data[0].views,
                date: response.data[0].uploaded,
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
            this.setState({
                notFound: true
            })
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
        const { videoId, isLoaded, title, description, author, views, date, authorDisplayName, isCreator } = this.state

        if (!this.state.notFound) {
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
                        <VideoComments videoId={videoId}/>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                        <VideoInformation 
                            id={author}
                            title={title} 
                            description={description}
                            views={views}
                            date={date}
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
        } else {
            return (
                <NotFound/>
            )
        }
    }
}
