import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import VideoPlayer from '../components/atoms/video/VideoPlayer'
import VideoComments from '../components/atoms/video/VideoComments'
import VideoInformation from '../components/atoms/video/VideoInformation'
import { Helmet } from 'react-helmet'
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
            authorDisplayName: null,
            notFound: false,
            name: null,
            avatar: null
        }
    }

    componentDidMount () {
        const params = this.props.match.params

        // Get all video information
        axios
        .get(config.apiUrl + '/api/v1/video/' + params.videoId)
        .then(res => {
            if (res.data.channelPhoto) {
                let avatarBase64 = new Buffer.from(res.data[0].channelPhoto, 'base64').toString('ascii')
                this.setState({
                    avatar: avatarBase64
                })
            }

            this.setState({
                isLoaded: true,
                videoId: res.data.videoId,
                title: res.data.title,
                description: res.data.description,
                streamUrl: res.data.streamUrl,
                author: res.data.author,
                views: res.data.views,
                date: res.data.uploaded,
                authorDisplayName: res.data.displayName
            })
            
            axios.post(`${config.apiUrl}/api/v1/video/${params.videoId}/view`)

            axios
            .get(`${config.apiUrl}/auth/user`)
            .then(res => {
                this.setState({
                    name: res.data.userName
                })
                if (res.data.passport.user.oid === this.state.author) {
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
    }

    render () {
        const { videoId, isLoaded, title, description, author, avatar, views, date, authorDisplayName, isCreator, streamUrl, name } = this.state

        return (
            <>
            <Helmet>
                <title>{`${title} | Lectern`}</title>
            </Helmet>
            {!this.state.notFound ?
                <div>
                    {isLoaded ? 
                    <>
                    <VideoPlayer mp4={streamUrl} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 px-4 sm:px-0">
                        <VideoInformation 
                            videoId={videoId}
                            id={author}
                            avatar={avatar}
                            title={title} 
                            description={description}
                            views={views}
                            date={date}
                            channelName={authorDisplayName}
                            subscribers="20"
                            isCreator={isCreator}
                        />
                        <VideoComments 
                            videoId={videoId}
                            name={ name ? 'as ' + name : ''}
                            isCreator={isCreator}/>
                    </div>
                    </>
                    :
                    <VideoSkeleton/>
                    }
                </div>
            :
                <NotFound/>
            }
            </>
        )
    }
}
