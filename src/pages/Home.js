import React, { Component } from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Thumbnail from '../components/atoms/video/Thumbnail'
import config from '../config'
import { HomeSkeleton } from '../components/skeletons/HomeSkeleton'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popular: null,
            recent: null
        }
    }

    componentDidMount() {
        axios
            .get(`${config.apiUrl}/api/v1/video/top`)
            .then(response => {
                this.setState({
                    popular: response.data
                })
            })
            .catch(error => {
                console.error(error)
            })

        axios
            .get(`${config.apiUrl}/api/v1/video/recent`)
            .then(response => {
                this.setState({
                    recent: response.data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    render () {
        const { popular, recent } = this.state

        return (
            <>
            <Helmet>
                <title>Lectern</title>
            </Helmet>
            <div>
            <h1 className="text-4xl font-bold mb-8">Popular on Lectern</h1>
            {popular ?
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                    {popular.map(video => {
                        return (
                            <Thumbnail 
                                key={video.videoId} 
                                id={video.videoId} 
                                title={video.title} 
                                description={video.author} 
                            />
                        )
                    })}
                </div>
                </>
                :
                <HomeSkeleton/>
            }
            <h1 className="text-4xl font-bold mb-8 mt-32">Latest videos</h1>
            {recent ?
                <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                    {recent.map(video => {
                        return (
                            <Thumbnail 
                                key={video.videoId} 
                                id={video.videoId} 
                                title={video.title} 
                                description={video.author} 
                            />
                        )
                    })}
                </div>
                </>
                :
                <HomeSkeleton/>
            }
            </div>
            </>
        )
    }
}
