import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import config from '../../../config'
import { Button, ButtonDestructive } from '../../../Design'
import Dialog from '../../Dialog'

import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'
import { ReactComponent as DownloadIcon } from '../../../icons/download.svg'
import { ReactComponent as StarIcon } from '../../../icons/star.svg'


export default function Video(props) {
    let history = useHistory()
    const [isDeleteDialogShown, setIsDeleteDialogShown] = useState(false)


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

    function toggleDeleteDialog() {
        setIsDeleteDialogShown(!isDeleteDialogShown)
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
            <Dialog 
                show={isDeleteDialogShown} 
                onPrimary={deleteVideo}
                onClose={toggleDeleteDialog}
                primaryStyle={ButtonDestructive}
                primary="Delete video"
                secondary="Cancel"
                secondaryStyle={Button}>
                <h4 className="font-bold text-lg">
                    Delete video
                </h4>
                <p className="my-2">
                    Are you sure you want to delete this video? All comments will be lost.
                </p>
            </Dialog>
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
                        <button className={ButtonDestructive + " mr-2"} onClick={toggleDeleteDialog}>
                            <DeleteIcon className="fill-current"/>
                        </button>
                    }
                    <button className={Button} onClick={downloadVideo}>
                        <DownloadIcon className="fill-current"/>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Link className="flex flex-row items-center font-bold" to={'/channel/' + props.id}>
                    {
                        props.avatar ?
                        <img 
                            className="flex-initial rounded-full overflow-hidden bg-gray-100 shadow h-8 w-8 mr-2" 
                            src={`data:image/jpeg;base64,${props.avatar}`}
                            alt={props.channelName + " avatar"}/>
                        :
                        <span className="block flex-initial rounded-full overflow-hidden bg-primary-200 shadow h-8 w-8 mr-2" />
                    }
                    {props.channelName}
                </Link>
            </div>
        </div>
    )
}
