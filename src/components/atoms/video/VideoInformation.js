import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import config from '../../../config'
import Design from '../../../Design'
import Dialog from '../../Dialog'

import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'
import { ReactComponent as DownloadIcon } from '../../../icons/download.svg'
import { ReactComponent as StarIcon } from '../../../icons/star.svg'


export default function Video(props) {
    let history = useHistory()

    function formatDate(date) {
        const d = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return (
            `${d.toLocaleDateString('en-US', options)}`
        )
    }

    function downloadVideo() {
        axios
        .get(`${config.apiUrl}/api/v1/video/${props.videoId}/download`)
        .then(res => {
            console.log(res)
        })
    }

    function deleteVideo() {
        axios
        .delete(`${config.apiUrl}/api/v1/video/${props.videoId}`)
        .then(() => {
            console.log(history)
            history.goBack()
        })
    }

    return (
        <div>
            <h1 className="text-xl font-bold font-header break-words" style={{ overflowWrap: 'word' }}>{props.title}</h1>
            <p className="text-gray-600 mt-4 break-words" style={{ overflowWrap: 'word' }}>{props.description}</p>
            <div className="flex justify-between items-center my-8">
                <div>
                    <p>{props.views} views</p>
                    <p>{formatDate(props.date)}</p>
                </div>
                <div className="flex align-middle">
                    {
                        props.isCreator &&
                        <button className={Design.ButtonDestructive + " mr-2"} onClick={deleteVideo}>
                            <DeleteIcon className="fill-current"/>
                        </button>
                    }
                    <button className={Design.Button + " mr-2"} onClick={downloadVideo}>
                        <DownloadIcon className="fill-current"/>
                    </button>
                    <button className={Design.Button}>
                        <StarIcon className="fill-current"/>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Link className="flex flex-row items-center font-bold" to={'/channel/' + props.id}>
                    <img 
                        className="flex-initial rounded-full overflow-hidden bg-gray-100 shadow h-8 w-8 mr-2" 
                        src={`data:image/jpeg;base64,${props.avatar}`}
                        alt={props.channelName + " avatar"}/>
                    {props.channelName}
                </Link>
            </div>
        </div>
    )
}
