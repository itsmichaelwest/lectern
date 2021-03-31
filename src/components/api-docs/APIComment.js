import React from 'react'
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
        "timestamp": "T00:01:15.000Z",
        "author": "d1b2b6bb-7888-455c-a202-b8659250a2fd",
        "comment": "This video is super insightful!",
        "reported": false
    }
    `

    return (
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-2xl font-bold mb-4">
                Comment (<span className="font-mono">/api/v1/comments</span>)
            </h1>
            <h2 className="text-xl font-bold mb-4">
                Data model and types
            </h2>
            <SyntaxHighlighter language="json" style={docco} className="rounded-xl">
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
                            timestamp
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Timestamp of the comment in ISO 8601 representation.
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
                            Comment string.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            isReported
                        </td>
                        <td className={cellCode}>
                            boolean
                        </td>
                        <td className={cell}>
                            If this comment has been reported, it will also be hidden awaiting judgement.
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr className="my-8"/>
            <h2 className="text-xl font-bold mb-4">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/api/v1/comments/[videoId]">
                Retrieves all comments associated with the specified video. This returns an array of Comment objects.
            </APIDescriber>
            <aside className="bg-primary-50 p-2 rounded">
                Authorization is required for all comment posting, updating, and deletion endpoints. See <Link to="/api/auth" className={Design.URL}>Authentication</Link>.
            </aside>
            <APIDescriber method="POST" endpoint="/api/v1/comments/[videoId]">
                Adds a comment to a video. The user will POST to the API with the following:
                <SyntaxHighlighter language="json" style={docco} className="rounded-xl my-4">
                    {`
    {
        "videoId": "cf332bd9-b18b-4100-9c82-cc5343217c40",
        "author": "123e4567-e89b-12d3-a456-426614174000",
        "comment": "This video is super insightful!"
    }
                    `}
                </SyntaxHighlighter>
                <table className="w-full table-auto border border-gray-200">
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
                                author
                            </td>
                            <td className={cellCode}>
                                string
                            </td>
                            <td className={cell}>
                                UUID of the comment's author.
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
                                Comment string.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </APIDescriber>
            <APIDescriber method="DELETE" endpoint="/api/v1/channel/[videoId]/[commentId]">
                Deletes comment from video. This can only be called by the comment author or the video uploader, other calls will result in a 403 Forbidden being returned.
            </APIDescriber>
            <APIDescriber method="POST" endpoint="/api/v1/comments/[videoId]/[commentId]/report">
                Used to report comment as inappropriate for the video. Returns true if the report was posted successfully. Will switch the value of reported to true. Subsequent reports will passively fail, we'll tell the user the comment was reported for their own satisfaction, but not actually alter any data since the report flag has been flipped.
            </APIDescriber>
            <APIDescriber method="DELETE" endpoint="/api/v1/comments/[videoId]/[commentId]/report">
                Resets the reported flag, essentially "unreporting" the comment.
            </APIDescriber>
        </div>
    )
}