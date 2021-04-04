import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Comment from '../comment/Comment'

export default function VideoComments(props) {
    const [isFetched, setIsFetched] = useState(false)
    const [comments, setComments] = useState(null)

    useEffect(() => {
        fetchComments()
    }, [isFetched])

    function fetchComments() {
        axios
        .get(`${config.apiUrl}/api/v1/comment/${props.videoId}`)
        .then(res => {
            setComments(res.data)
            setIsFetched(true)
            console.log(comments)
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        
        <div>
            <div className="border rounded h-full max-h-64 lg:max-h-full overflow-y-scroll">
                {comments && 
                    comments.map(comment => {
                        return (
                            <Comment
                                time="00:00"
                                name={comment.author}
                                content={comment.comment}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}