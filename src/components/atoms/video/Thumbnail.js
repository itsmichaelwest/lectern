import React from 'react'
import { Link } from 'react-router-dom'

export default function Thumbnail(props) {
    return (
        <>
        <Link to={`/video/${props.id}`}>
            <div>
                <div className="relative w-full rounded-lg mb-2 shadow hover:shadow-lg" style={{ height: 0, paddingBottom: '56.25%', backgroundImage: `url(${props.background})`, backgroundSize: 'cover' }}>
                    { props.length ?
                    <div className="bg-black text-white font-semibold bg-opacity-40 px-2 py-1 rounded max-w-max absolute right-2 bottom-2" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        {props.length}
                    </div>
                    :
                    <></>
                    }
                </div>
                <h5 className="font-semibold">{props.title}</h5>
                <p className="text-gray-600">{props.description}</p>
            </div>
        </Link>
        </>
    )
}
