import React from 'react'

export default function VideoPlayer(props) {
    return (
        <video controls autoPlay id="video" className="w-full bg-black rounded-xl">
            <source src={props.mp4} type="video/mp4" />
        </video>
    )
}