import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import getHumanReadableTime from '../../../functions/getHumanReadableTime'
import axios from 'axios'

export default function Thumbnail(props) {
    const [thumbnail, setThumbnail] = useState('')

    if (props.thumb !== null) {
        axios
        .get(props.thumb)
        .then(res => {
            setThumbnail(res.data)
        })
    }

    return (
        <Link to={`/video/${props.id}`}>
            <div>
                <div className="relative w-full rounded-lg mb-2 shadow-sm hover:shadow-lg transform hover:scale-105 hover:-translate-y-2 transition-all bg-gray-100 dark:bg-gray-900 overflow-hidden bg-center bg-cover" style={{ height: 0, paddingBottom: '56.25%', backgroundImage: `url('${thumbnail}')` }}>
                    { props.length ?
                    <div className="bg-black text-white font-semibold bg-opacity-40 px-2 py-1 rounded max-w-max absolute right-2 bottom-2" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                        {getHumanReadableTime(props.length)}
                    </div>
                    :
                    <></>
                    }
                </div>
                <h5 className="font-semibold dark:text-white whitespace-nowrap truncate">
                    {props.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 whitespace-nowrap truncate">
                    {props.description}
                </p>
            </div>
        </Link>
    )
}
