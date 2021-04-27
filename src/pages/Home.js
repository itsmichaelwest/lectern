import React, { Component } from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Thumbnail from '../components/atoms/video/Thumbnail'
import config from '../config'
import { HomeSkeleton } from '../components/skeletons/HomeSkeleton'
import { ReactComponent as NewIdeasSVG } from '../vectors/undraw-newideas.svg'

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
            <div className="px-4 sm:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 rounded-xl w-full bg-gray-100 dark:bg-gray-900 mb-16 p-16">
                    <div className="max-h-80">
                        <NewIdeasSVG className="h-full w-full" />
                    </div>
                    <div className="flex h-full items-center">
                        <div>
                            <h1 className="text-4xl text-primary dark:text-primary-700 font-bold font-header mb-4">
                                Welcome to Lectern!
                            </h1>
                            <p className="prose dark:prose-dark">
                                We're excited for you to start watching, learning,
                                and engaging. Check out popular and latest videos below.
                            </p>
                        </div>
                    </div>

                </div>
                <h1 className="text-4xl dark:text-white font-bold font-header mb-8">
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
                                    description={video.displayName} 
                                    length={video.length}
                                    thumb={video.thumbnail}
                                />
                            )
                        })}
                    </div>
                    </>
                    :
                    <HomeSkeleton/>
                }
                <h1 className="text-4xl dark:text-white font-bold font-header mb-8 mt-32">Latest videos</h1>
                {recent ?
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {recent.map(video => {
                            return (
                                <Thumbnail 
                                    key={video.videoId} 
                                    id={video.videoId} 
                                    title={video.title} 
                                    description={video.displayName} 
                                    length={video.length}
                                    thumb={video.thumbnail}
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
