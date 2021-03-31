import React from 'react'
import AuthAPIDocs from '../components/api-docs/APIAuth'
import ChannelAPIDocs from '../components/api-docs/APIChannel'
import CommentAPIDocs from '../components/api-docs/APIComment'
import VideoAPIDocs from '../components/api-docs/APIVideo'
import NotFound from './NotFound'

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