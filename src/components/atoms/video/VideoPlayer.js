import React from 'react'

export default function VideoPlayer(props) {
    return (
        <video controls autoPlay playsInline id="video" className="sticky top-nav-height sm:relative sm:top-auto -mt-8 sm:-mt-0 w-full bg-black shadow-lg sm:rounded-xl outline-none max-h-96 sm:max-h-screen z-30">
            <source src={props.mp4} type="video/mp4" />
        </video>
    )
}