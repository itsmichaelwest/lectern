import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Design from '../../../Design'
import getHumanReadableTime from '../../../functions/getHumanReadableTime'

import { ReactComponent as ReportIcon } from '../../../icons/report.svg'
import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'

export default function Comment(props) {
    const [showButtons, setShowButtons] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // Navigate the active video on the page to the selected timestamp.
    function navigateVideoToTimestamp() {
        let video = document.getElementById('video')
        video.currentTime = props.timestamp
        video.play()
    }

    // Show the delete and report buttons on hover.
    function setShowActionButtons(value) {
        if (showDeleteDialog) {
            setShowButtons(false)
        } else {
            setShowButtons(value)
        }
    }

    // Hide the action buttons when the delete banner is opened.
    function setShowDeleteBanner(value) {
        setShowButtons(false)
        setShowDeleteDialog(value)
    }
    
    return (
        <div className="relative hover:bg-gray-50 dark:hover:bg-gray-900"
            onMouseEnter={() => setShowActionButtons(true)}
            onMouseLeave={() => setShowActionButtons(false)}
            data-testid="comment-container">
            {showDeleteDialog && (
                <div className="absolute p-4 flex items-center justify-between h-full w-full inset-0 z-10 bg-white dark:bg-gray-900 bg-opacity-70" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <p className="font-semibold ml-2 dark:text-white">
                        Delete this comment?
                    </p>
                    <div className="inline-flex">
                        <button 
                            className={Design.ButtonDestructive + " mr-1"} 
                            onClick={() => props.onDelete(props.commentId)}>
                            <DeleteIcon className="-ml-1 mr-2 fill-current"/>
                            Delete
                        </button>
                        <button className={Design.Button} onClick={() => setShowDeleteBanner(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {showButtons &&
                <div className="absolute right-0 p-4 items-center" data-testid="buttons">
                    <button className={Design.Button}>
                        <ReportIcon className="fill-current"/>
                    </button>
                    {props.canBeDeleted && 
                        <button 
                            className={Design.ButtonDestructive + " ml-1"} 
                            onClick={() => setShowDeleteBanner(true)}>
                            <DeleteIcon className="fill-current"/>
                        </button>
                    }
                </div>
            }
            <div className="flex p-4 cursor-pointer" onClick={navigateVideoToTimestamp}>
                <span className="flex-initial flex-shrink-0 w-16 max-h-5">
                    <span id="timestamp" className="font-semibold dark:text-gray-100" data-testid="timestamp">
                        {getHumanReadableTime(props.time)}
                    </span>
                </span>
                <div>
                    <div className="flex align-middle">
                        <span className={Design.URL + " font-semibold"}>
                            <Link id="name" to={`/channel/${props.author}`} data-testid="name">
                                {props.name}
                            </Link>
                        </span>
                    </div>
                    <div>
                        <p className="dark:text-white" style={{ overflowWrap: 'anywhere' }} data-testid="comment">
                            {props.content}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}