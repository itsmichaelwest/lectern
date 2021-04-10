import React from 'react'
import queryString from 'query-string'
import Thumbnail from '../components/atoms/video/Thumbnail'

export default class Search extends React.Component {
    render() {
        let query = queryString.parse(this.props.location.search)
        return (
            <div className="px-4 sm:px-0">
            {query.find ? 
                <div>
                    <h1 className="text-3xl md:text-6xl font-bold font-header my-16">
                        Results for "{query.find}"
                    </h1>
                    {this.props.location.state.results ?
                    <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">                    
                        {this.props.location.state.results.map(video => {
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
        )
    }
}