import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Comment from '../comment/Comment'
import { Formik, Field, Form } from 'formik'
import Design from '../../../Design'
import addComment from '../../../functions/addComment'
import { ReactComponent as SurveySVG } from '../../../vectors/undraw-survey.svg'
import SignInChallenge from '../../SignInChallenge'
import { ReactComponent as SendIcon } from '../../../icons/send.svg'
import getHumanReadableTime from '../../../functions/getHumanReadableTime'

export default function VideoComments(props) {
    const [isFetched, setIsFetched] = useState(false)
    const [comments, setComments] = useState(null)
    const [userId, setUserId] = useState(null)
    const [signInChallenge, setSignInChallenge] = useState(false)

    useEffect(() => {
        fetchComments()
    }, [isFetched])

    useEffect(() => {
        fetchUserId()
    }, [isFetched])

    function fetchComments() {
        axios
        .get(`${config.apiUrl}/api/v1/comment/${props.videoId}`)
        .then(res => {
            setIsFetched(true)
            setComments(res.data)
        })
    }

    function fetchUserId() {
        axios
        .get(`${config.apiUrl}/auth/user`)
        .then(res => {
            setUserId(res.data.passport.user.oid)
        })
    }

    function deleteComment(commentId) {
        axios
        .delete(`${config.apiUrl}/api/v1/comment/${props.videoId}/${commentId}`)
        .then(() => {
            fetchComments()
        })
    }

    function toggleSignInChallenge() {
        setSignInChallenge(!signInChallenge)
    }

    function getCurrentVideoTime() {
        let video = document.getElementById('video')
        return video.currentTime
    }

    function validateComment(value) {
        if (!value) {
            return 'Please enter a comment'
        }
    }

    return (
        <>
        <SignInChallenge
            show={signInChallenge}
            onClose={toggleSignInChallenge}
        />
        <div className="flex flex-col border rounded-xl shadow-sm divide-y overflow-hidden">
            <div className="h-full max-h-96 overflow-y-scroll">
                {comments ?
                    comments.map(comment => {
                        if (comment.author === userId || props.isCreator) {
                            return (
                                <Comment
                                    key={comment.commentId}
                                    time={getHumanReadableTime(comment.timestamp)}
                                    timestamp={comment.timestamp}
                                    author={comment.author}
                                    name={comment.userName}
                                    content={comment.comment}
                                    canBeDeleted={true}
                                    commentId={comment.commentId}
                                    onDelete={() => deleteComment(comment.commentId)}
                                />
                            )
                        } else {
                            return (
                                <Comment
                                    key={comment.commentId}
                                    time={getHumanReadableTime(comment.timestamp)}
                                    timestamp={comment.timestamp}
                                    author={comment.author}
                                    name={comment.userName}
                                    content={comment.comment}
                                />
                            )
                        }
                    })
                :
                    <div className="w-full text-center p-16">
                        <SurveySVG 
                            className="mx-auto mb-4" 
                            style={{ maxWidth: '16rem' }}/>
                        <h4 className="text-2xl font-semibold font-header mb-1">
                            No comments, yet
                        </h4>
                        <p>
                            Start a discussion!
                        </p>
                    </div>
                }
            </div>
            <div className="w-full p-2">
                <Formik
                    initialValues={{
                        comment: ''
                    }}
                    
                    onSubmit={async (values, { resetForm }) => {
                        const currentTime = getCurrentVideoTime()
                        addComment(
                            props.videoId,
                            values.comment,
                            currentTime,
                            (res) => {
                                if (res === false) {
                                    console.error('[VideoComments] issue lol')
                                    setSignInChallenge(true)
                                } else {
                                    setIsFetched(false)
                                    resetForm({ values: '' })
                                }
                            }
                        )
                    }}>
                    <Form className="w-full flex space-x-2" autoComplete="off">
                        <Field 
                            id="comment" 
                            name="comment" 
                            placeholder={`Comment publicly ${props.name}`}
                            type="text" 
                            validate={validateComment}
                            className={Design.Input + " flex-grow"}/>
                        <button className={Design.ButtonPrimary} type="submit">
                            <SendIcon className="-ml-1 mr-2 fill-current"/>
                            Post
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
        </>
    )
}