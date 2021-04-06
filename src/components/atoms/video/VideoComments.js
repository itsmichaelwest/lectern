import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Comment from '../comment/Comment'
import { Formik, Field, Form } from 'formik'
import Design from '../../../Design'
import addComment from '../../../functions/addComment'
import SurveySVG from '../../../vectors/undraw-survey.svg'
import SignInChallenge from '../../SignInChallenge'

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
            console.log(res.data)
            setIsFetched(true)
            setComments(res.data)
        })
        .catch(err => {
            console.error(err)
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
        .then(res => {
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

    function getHumanReadableTime(time) {
        let minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60
        if (minutes.toString().length === 1) {
            minutes = `0${minutes}`
        }
        if (seconds.toString().length === 1) {
            seconds = `0${seconds}`
        }
        return (`${minutes}:${seconds}`)
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
                        if (comment.author === userId) {
                            return (
                                <Comment
                                    key={comment.commentId}
                                    time={getHumanReadableTime(comment.timestamp)}
                                    timestamp={comment.timestamp}
                                    author={comment.author}
                                    name={comment.authorDisplayName}
                                    content={comment.comment}
                                    isUserAuthor={true}
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
                                    name={comment.authorDisplayName}
                                    content={comment.comment}
                                />
                            )
                        }
                    })
                :
                    <div className="w-full text-center p-16">
                        <img src={SurveySVG} className="mx-auto mb-4" style={{ maxWidth: '16rem' }} />
                        <h4 className="text-2xl font-semibold font-header">
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
                            placeholder="Write a comment..."
                            type="text" 
                            className={Design.Input + " flex-grow"}
                        />
                        <button className={Design.ButtonPrimary} type="submit">
                            <svg className="h-5 w-4 mr-2" viewBox="0 0 16 20" >
                                <path d="M0.721126 2.05149L16.0756 9.61746C16.3233 9.73952 16.4252 10.0393 16.3031 10.287C16.2544 10.3858 16.1744 10.4658 16.0756 10.5145L0.721442 18.0803C0.473739 18.2023 0.173989 18.1005 0.0519328 17.8528C-0.00143915 17.7445 -0.0138112 17.6205 0.0171017 17.5038L1.9858 10.0701L0.016755 2.62789C-0.0538755 2.36093 0.105278 2.08726 0.372235 2.01663C0.488927 1.98576 0.61285 1.99814 0.721126 2.05149ZM1.26445 3.43403L2.87357 9.51612L2.93555 9.50412L3 9.5H10C10.2761 9.5 10.5 9.72386 10.5 10C10.5 10.2455 10.3231 10.4496 10.0899 10.4919L10 10.5H3C2.9686 10.5 2.93787 10.4971 2.90807 10.4916L1.26508 16.6976L14.7234 10.066L1.26445 3.43403Z" fill="#ffffff"/>
                            </svg>
                            Post
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
        </>
    )
}