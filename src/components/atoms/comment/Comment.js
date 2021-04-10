import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Design from '../../../Design'

import { ReactComponent as ReportIcon } from '@fluentui/svg-icons/icons/shield_error_20_regular.svg'
import { ReactComponent as DeleteIcon } from '@fluentui/svg-icons/icons/delete_20_regular.svg'

export default function Comment(props) {
    const [showButtons, setShowButtons] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    function navigateVideoToTimestamp() {
        let video = document.getElementById('video')
        video.currentTime = props.timestamp
        video.play()
    }

    function setShowActionButtons(val) {
        if (showDeleteDialog) {
            setShowButtons(false)
        } else {
            setShowButtons(val)
        }
    }

    function setShowDeleteBanner(val) {
        setShowButtons(false)
        setShowDeleteDialog(val)
    }
    
    
    return (
        <div className="relative p-4 hover:bg-gray-50"
            onMouseEnter={() => setShowActionButtons(true)}
            onMouseLeave={() => setShowActionButtons(false)}>
            {showDeleteDialog && (
                <div className="absolute p-4 flex items-center justify-between h-full w-full inset-0 z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <p className="font-semibold ml-2">
                        Delete this comment?
                    </p>
                    <div className="inline-flex">
                        <button 
                            className={Design.ButtonDestructive + " mr-1"} 
                            onClick={() => props.onDelete(props.commentId)}>
                            <DeleteIcon 
                                fill="white"
                                className="-ml-1 mr-2"/>
                            Delete
                        </button>
                        <button className={Design.Button} onClick={() => setShowDeleteBanner(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showButtons &&
                <div className="absolute right-0 mr-4 items-center">
                    <button className={Design.Button}>
                        <ReportIcon/>
                    </button>
                    {props.canBeDeleted && 
                        <button 
                            className={Design.ButtonDestructive + " ml-1"} 
                            onClick={() => setShowDeleteBanner(true)}>
                            <DeleteIcon fill="white"/>
                        </button>
                    }
                </div>
            }
            <div className="flex">
                <span className="flex-initial flex-shrink-0 w-16 max-h-5">
                    <span className="font-semibold hover:text-gray-600 cursor-pointer" onClick={navigateVideoToTimestamp}>
                        {props.time}
                    </span>
                </span>
                <div>
                    <div className="flex align-middle">
                        <span className={Design.URL + " font-semibold"}>
                            <Link to={`/channel/${props.author}`}>
                                {props.name}
                            </Link>
                        </span>
                    </div>
                    <div>
                        <p style={{ overflowWrap: 'anywhere' }}>
                            {props.content}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}