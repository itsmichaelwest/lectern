import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Comment from '../comment/Comment'
import { Formik, Field, Form } from 'formik'
import Design from '../../../Design'
import addComment from '../../../functions/comment/addComment'

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
            setIsFetched(true)
            setComments(res.data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div className="flex flex-col border rounded divide-y">
            <div className="h-full max-h-64 overflow-y-scroll">
                {comments && 
                    comments.map(comment => {
                        return (
                            <Comment
                                key={comment.commentId}
                                time="00:00"
                                author={comment.author}
                                name={comment.authorDisplayName}
                                content={comment.comment}
                            />
                        )
                    })
                }
            </div>
            <div className="w-full p-2">
                <Formik
                    initialValues={{
                        comment: ''
                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                        addComment(
                            props.videoId,
                            values.comment
                        )
                        setIsFetched(false)
                    }}>
                    <Form className="w-full flex space-x-2" autoComplete="off">
                        <Field 
                            id="comment" 
                            name="comment" 
                            placeholder="Write a comment..."
                            type="text" 
                            className={Design.Input + " flex-grow"}
                        />
                        <button className={Design.ButtonPrimary} type="submit">
                            Post
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}