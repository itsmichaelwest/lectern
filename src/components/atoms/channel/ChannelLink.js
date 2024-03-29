import React from 'react'
import { Link } from 'react-router-dom'

// ChannelLink component, used in search results.
export default function ChannelLink(props) {
    function decodeAvatar(avatar) {
        return new Buffer.from(avatar, 'base64').toString('ascii')
    }

    return (
        <Link className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all" to={`/channel/${props.id}`}>
            {
                props.avatar ?
                <img 
                    className="flex-initial flex-shrink-0 rounded-full overflow-hidden bg-gray-200 h-10 w-10 shadow-lg mr-3" 
                    src={`data:image/jpeg;base64,${decodeAvatar(props.avatar)}`} 
                    alt={props.name + " avatar"} />
                :
                <span className="block flex-initial flex-shrink-0 rounded-full overflow-hidden bg-primary-200 dark:bg-primary-800 h-10 w-10 shadow-lg mr-3"/>
            }
            <h2 className="font-semibold text-xl whitespace-nowrap truncate dark:text-white">{props.name}</h2>
        </Link>
    )
}
