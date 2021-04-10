import React from 'react'
import { Link } from 'react-router-dom'
import VideoThumbnail from 'react-video-thumbnail'

export default function Thumbnail(props) {
    return (
        <>
        <Link to={`/video/${props.id}`}>
            <div>
                <div className="relative w-full rounded-lg mb-2 shadow-sm hover:shadow-md transition-all bg-gray-100 overflow-hidden" style={{ height: 0, paddingBottom: '56.25%' }}>
                    <VideoThumbnail 
                        videoUrl={`https://cs394lecternvideos.blob.core.windows.net/videos/${props.id}`}
                        className="absolute inset-0 w-full h-full" />
                    { props.length ?
                    <div className="bg-black text-white font-semibold bg-opacity-40 px-2 py-1 rounded max-w-max absolute right-2 bottom-2" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        {props.length}
                    </div>
                    :
                    <></>
                    }
                </div>
                <h5 className="font-semibold whitespace-nowrap truncate">{props.title}</h5>
                <p className="text-gray-600 whitespace-nowrap truncate">{props.description}</p>
            </div>
        </Link>
        </>
    )
}
