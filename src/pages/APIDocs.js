import React from 'react'
import AuthAPIDocs from '../components/api-docs/auth'
import ChannelAPIDocs from '../components/api-docs/channel'
import CommentAPIDocs from '../components/api-docs/comment'
import VideoAPIDocs from '../components/api-docs/video'
import NotFound from '../pages/NotFound'

export default function APIDocs(props) {
    const params = props.match.params
    const apiType = params.apiType

    switch(apiType) {
        case "auth":
            return ( <AuthAPIDocs/> )
        case "channel":
            return ( <ChannelAPIDocs/> )
        case "comment":
            return ( <CommentAPIDocs/> )
        case "video":
            return ( <VideoAPIDocs/> )
        default:
            return ( <NotFound/> )
    }
}