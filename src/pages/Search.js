import React from 'react'
import queryString from 'query-string'
import Thumbnail from '../components/atoms/video/Thumbnail'
import ChannelLink from '../components/atoms/channel/ChannelLink'
import { Helmet } from 'react-helmet'

// Search page, displays video and channel results.
export default function Search(props) {
    let query = queryString.parse(props.location.search)

    return (
        <>
        <Helmet>
            <title>Search results for "{query.find}" | Lectern</title>
        </Helmet>
        <div className="px-4 sm:px-0">
        {query.find ? 
            <div>
                <h1 className="text-4xl md:text-6xl font-bold dark:text-white font-header mt-16">
                    Results for "{query.find}"
                </h1>
                {props.location.state.results[0].length > 0 ?
                    <>
                    <h2 className="text-2xl dark:text-white font-bold font-header mt-24 mb-4">
                        Videos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {props.location.state.results[0].map(video => {
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
                    <></>
                }
                {props.location.state.results[1].length > 0 ?
                    <>
                    <h2 className="text-2xl dark:text-white font-bold font-header mt-16 mb-4">
                        Channels
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {props.location.state.results[1].map(channel => {
                            return (
                                <ChannelLink 
                                    key={channel.channelId}
                                    id={channel.channelId}
                                    name={channel.displayName}
                                    avatar={channel.channelPhoto}
                                />
                            )
                        })}
                    </div>
                    </>
                    :
                    <></>
                }
            </div>
        :
        <div>
            <p>
                Enter a search term above to search videos.
            </p>
        </div>
        }
        </div>
        </>
    )
}