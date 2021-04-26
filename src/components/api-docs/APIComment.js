import React from 'react'
import { Helmet } from 'react-helmet'
import APIPublicPreview from './APIPublicPreview'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import APIDescriber from './APIDescriber'
import { Link } from 'react-router-dom'
import Design from '../../Design'

export default function CommentAPIDocs() {
    const cell = 'border border-gray-200 text-sm p-2 align-top'
    const cellCode = cell + ' font-mono'

    const dataObject = `
    {
        "commentId": "123e4567-e89b-12d3-a456-426614174000",
        "videoId": "cf332bd9-b18b-4100-9c82-cc5343217c40",
        "pubDate": "2021-04-08T11:20:35.208Z",
        "timestamp": 700,
        "author": "d1b2b6bb-7888-455c-a202-b8659250a2fd",
        "comment": "This video is super insightful!",
        "reported": false,
        "channelId": "d1b2b6bb-7888-455c-a202-b8659250a2fd",
        "displayName": "Alex Smith",
        "channelPhoto": {
            type: "Buffer",
            data: {
                [...]
            }
        },
        "suspended": false
    }
    `

    const commentPostObject = `
    {
        "timestamp": 700,
        "comment": "This video is super insightful!"
    }
    `

    return (
        <>
        <Helmet>
            <title>Comment - API | Lectern</title>
        </Helmet>
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-3xl text-gray-700 font-header font-bold mb-4">
                Comment (<span className="font-mono">/api/v1/comments</span>)
            </h1>
            <h2 className="text-xl font-header font-bold mb-4">
                Data model and types
            </h2>
            <SyntaxHighlighter 
                language="json" 
                style={docco} 
                wrapLongLines={true} 
                className="rounded-xl">
                {dataObject}            
            </SyntaxHighlighter>
            <table className="w-full table-auto border border-gray-200 mt-8">
                <thead>
                    <th className={cell}>
                        Field
                    </th>
                    <th className={cell}>
                        Type
                    </th>
                    <th className={cell}>
                        Description
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td className={cellCode}>
                            commentId
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            UUID of comment.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            videoId
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            UUID of video the comment is posted on.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            pubDate
                        </td>
                        <td className={cellCode}>
                            date
                        </td>
                        <td className={cell}>
                            Date and time the comment was published, in ISO 8601 representation.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            timestamp
                        </td>
                        <td className={cellCode}>
                            number
                        </td>
                        <td className={cell}>
                            Position of the comment in the video in seconds.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            author
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            UUID of comment author.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            authorDisplayName
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Display name of comment author.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            comment
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Comment body.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            reported
                        </td>
                        <td className={cellCode}>
                            boolean
                        </td>
                        <td className={cell}>
                            If this comment has been reported, it will also be hidden awaiting judgement.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            channelId
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            UUID of channel.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            displayName
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Channel's user-facing display name.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            channelPhoto
                        </td>
                        <td className={cellCode}>
                            buffer
                        </td>
                        <td className={cell}>
                            Channel photo in base64 format.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            reported
                        </td>
                        <td className={cellCode}>
                            boolean
                        </td>
                        <td className={cell}>
                            If this channel has been reported or not.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 className="text-xl font-header font-bold mt-24 -mb-8">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/api/v1/comments/[videoId]">
                Retrieves all comments associated with the specified video. This returns an array of Comment objects.
            </APIDescriber>
            <aside className="bg-primary-50 p-2 rounded -mb-8">
                Authorization is required for these endpoints. See <Link to="/api/auth" className={Design.URL}>Authentication</Link>.
            </aside>
            <APIDescriber method="POST" endpoint="/api/v1/comments/[videoId]">
                Adds a comment to a video. The comment data should be sent in the <span className="font-mono">application/x-www-form-urlencoded</span> format:
                <SyntaxHighlighter 
                    language="json"
                    wrapLongLines={true} 
                    style={docco} 
                    className="rounded-xl mt-4">
                    {commentPostObject}
                </SyntaxHighlighter>
                <table className="w-full table-auto border border-gray-200 my-4">
                    <thead>
                        <th className={cell}>
                            Field
                        </th>
                        <th className={cell}>
                            Type
                        </th>
                        <th className={cell}>
                            Description
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cellCode}>
                                timestamp
                            </td>
                            <td className={cellCode}>
                                number
                            </td>
                            <td className={cell}>
                                Position of the comment in the video in seconds.
                            </td>
                        </tr>
                        <tr>
                            <td className={cellCode}>
                                comment
                            </td>
                            <td className={cellCode}>
                                string
                            </td>
                            <td className={cell}>
                                Comment body.
                            </td>
                        </tr>
                    </tbody>
                </table>
                If the comment insertion was successful, a HTTP 200 response
                will be issued. Otherwise, a HTTP 500 response will be issued.
            </APIDescriber>
            <APIDescriber method="DELETE" endpoint="/api/v1/channel/[videoId]/[commentId]">
                Deletes comment from video. If successful, a HTTP 200 response will be issued. This endpoint can only be called by the comment author or the video uploader, other calls will result in a HTTP 403 Forbidden being returned.
            </APIDescriber>
        </div>
        </>
    )
}