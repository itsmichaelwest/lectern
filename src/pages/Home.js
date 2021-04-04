import React, { Component } from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Thumbnail from '../components/atoms/video/Thumbnail'
import config from '../config'
import { HomeSkeleton } from '../components/skeletons/HomeSkeleton'
import NewIdeasSVG from '../vectors/undraw-newideas.svg'

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
            .then(res => {
                this.setState({
                    popular: res.data
                })
            })
            .catch(error => {
                console.error(error)
            })

        axios
            .get(`${config.apiUrl}/api/v1/video/recent`)
            .then(res => {
                this.setState({
                    recent: res.data
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl w-full bg-gray-100 mb-16 p-16">
                    <div>
                        <img src={NewIdeasSVG} className="max-h-80" />
                    </div>
                    <div className="flex h-full items-center">
                        <div>
                            <h1 className="text-4xl text-primary font-bold font-header mb-4">
                                Welcome to Lectern!
                            </h1>
                            <p className="prose">
                                We're excited for you to start watching, learning,
                                and engaging. Check out popular and latest videos below.
                            </p>
                        </div>
                    </div>

                </div>
                <h1 className="text-4xl font-bold font-header mb-8">
                    Popular
                </h1>
                {popular ?
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {popular.map(video => {
                            return (
                                <Thumbnail 
                                    key={video.videoId} 
                                    id={video.videoId} 
                                    title={video.title} 
                                    description={video.authorDisplayName} 
                                    length={video.length}
                                />
                            )
                        })}
                    </div>
                    </>
                    :
                    <HomeSkeleton/>
                }
                <h1 className="text-4xl font-bold font-header mb-8 mt-32">Latest videos</h1>
                {recent ?
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {recent.map(video => {
                            return (
                                <Thumbnail 
                                    key={video.videoId} 
                                    id={video.videoId} 
                                    title={video.title} 
                                    description={video.authorDisplayName} 
                                    length={video.length}
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
