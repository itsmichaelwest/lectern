import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Comment from '../comment/Comment'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Design from '../../../Design'
import addComment from '../../../functions/addComment'
import { ReactComponent as SurveySVG } from '../../../vectors/undraw-survey.svg'
import SignInChallenge from '../../SignInChallenge'
import { ReactComponent as SendIcon } from '../../../icons/send.svg'

// VideoComments component, renders all the comments on a video.
export default function VideoComments(props) {
    const [isFetched, setIsFetched] = useState(false)
    const [comments, setComments] = useState(null)
    const [userId, setUserId] = useState(null)
    const [signInChallenge, setSignInChallenge] = useState(false)

    // Fetch the comments from the API endpoint.
    const fetchComments = useCallback(() => {
        axios
        .get(`${config.apiUrl}/api/v1/comment/${props.videoId}`)
        .then(res => {
            setIsFetched(true)
            setComments(res.data)
        })
    }, [props.videoId])

    // Fetch comments when the variable isFetched is false.
    useEffect(() => {
        fetchComments()
    }, [fetchComments, isFetched])

    // Fetch the user's ID when the variable isFetched is false.
    useEffect(() => {
        fetchUserId()
    }, [isFetched])

    // Fetch the user's ID from the API endpoint, we use this to check if the
    // user is the author of any comments.
    function fetchUserId() {
        axios
        .get(`${config.apiUrl}/auth/user`)
        .then(res => {
            setUserId(res.data.passport.user.oid)
        })
    }

    // Delete a comment and then reload the comments view.
    function deleteComment(commentId) {
        axios
        .delete(`${config.apiUrl}/api/v1/comment/${props.videoId}/${commentId}`)
        .then(() => {
            fetchComments()
        })
    }

    // Display a sign in dialog if the user isn't signed in.
    function toggleSignInChallenge() {
        setSignInChallenge(!signInChallenge)
    }

    // Get the current timestamp of the video in seconds.
    function getCurrentVideoTime() {
        let video = document.getElementById('video')
        return video.currentTime
    }

    // Check the comment form is not empty.
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
        <div className="flex flex-col border dark:border-gray-700 rounded-xl shadow-sm divide-y dark:divide-gray-700 dark:bg-black overflow-hidden">
            <div className="h-full max-h-96 overflow-y-scroll">
                {comments ?
                    comments.map(comment => {
                        if (comment.author === userId || props.isCreator) {
                            return (
                                <Comment
                                    key={comment.commentId}
                                    time={comment.timestamp}
                                    timestamp={comment.timestamp}
                                    author={comment.author}
                                    name={comment.displayName}
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
                                    time={comment.timestamp}
                                    timestamp={comment.timestamp}
                                    author={comment.author}
                                    name={comment.displayName}
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
                        <h4 className="text-2xl dark:text-white font-semibold font-header mb-1">
                            No comments, yet
                        </h4>
                        <p className="dark:text-white">
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
                                    setSignInChallenge(true)
                                    console.log(signInChallenge)
                                } else {
                                    setIsFetched(false)
                                    resetForm({ values: '' })
                                }
                            }
                        )
                    }}>
                    <Form className="w-full flex space-x-2 -mb-1" autoComplete="off">
                        <div className="w-full flex flex-col">
                            <Field 
                                id="comment" 
                                name="comment" 
                                placeholder={`Comment publicly ${props.name}`}
                                type="text" 
                                validate={validateComment}
                                className={Design.Input + " flex-grow"}/>
                            <div className="text-xs text-red-600 mt-1 ml-1">
                                <ErrorMessage name="comment"/>
                            </div>
                        </div>
                        <button className={Design.ButtonPrimary + " h-full"} type="submit">
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