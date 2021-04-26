import React from 'react'
import { Helmet } from 'react-helmet'
import APIPublicPreview from './APIPublicPreview'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import APIDescriber from './APIDescriber'
import { Link } from 'react-router-dom'
import Design from '../../Design'

export default function VideoAPIDocs() {
    const cell = 'border border-gray-200 text-sm p-2 align-top'
    const cellCode = cell + ' font-mono'

    const dataObject = `
    {
        "videoId": "cf332bd9-b18b-4100-9c82-cc5343217c40",
        "streamUrl": "https://cs394lecternvideos.blob.core.windows.net/videos/cf332bd9-b18b-4100-9c82-cc5343217c40",
        "privacy": 0,
        "author": "d1b2b6bb-7888-455c-a202-b8659250a2fd", 
        "uploaded": "2021-01-01T12:00:00.000Z",
        "title": "Sample Video",
        "description": "This is a sample video. Lorem ipsum dolor etc etc.",
        "length": 270,
        "views": 500,
        "thumbnail": "https://cs394lecternvideos.blob.core.windows.net/thumbnails/cf332bd9-b18b-4100-9c82-cc5343217c40",
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

    return (
        <>
        <Helmet>
            <title>Video - API | Lectern</title>
        </Helmet>
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-2xl font-bold mb-4">
                Video (<span className="font-mono">/api/v1/video</span>)
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
                            videoId
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            UUID of video.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            streamUrl
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            URL pointing to where the video player can find the video stream.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            privacy
                        </td>
                        <td className={cellCode}>
                            number
                        </td>
                        <td className={cell}>
                            Privacy setting of the video. <span className="font-mono">0</span> represents Public, <span className="font-mono">1</span> Unlisted, and <span className="font-mono">2</span> Private.
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
                            UUID of video uploader.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            uploaded
                        </td>
                        <td className={cellCode}>
                            date
                        </td>
                        <td className={cell}>
                            Upload time of the video in ISO 8601 representation.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            title
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Title of the video.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            description
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            Description of the video.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            length
                        </td>
                        <td className={cellCode}>
                            number
                        </td>
                        <td className={cell}>
                            Length of the video in seconds.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            views
                        </td>
                        <td className={cellCode}>
                            number
                        </td>
                        <td className={cell}>
                            Total number of views the video has.
                        </td>
                    </tr>
                    <tr>
                        <td className={cellCode}>
                            thumbnail
                        </td>
                        <td className={cellCode}>
                            string
                        </td>
                        <td className={cell}>
                            URL pointing to the video's thumbnail image.
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
            <hr className="my-8"/>
            <h2 className="text-xl font-bold mb-4">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/api/v1/video/all">
                Returns all videos on the service. Array of video JSON objects. Unwise to use, will eventually return a large quantity of videos.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/video/top">
                Returns the top 10 videos, sorted by view count.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/video/recent">
                Returns the 10 most recently uploaded videos.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/video/[videoId]">
                Returns information about specified video.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/video/[videoId]/download">
                Downloads the encoded video file from the server. The file will have no metadata, as we strip that during the encoding process.
            </APIDescriber>
            <aside className="bg-primary-50 p-2 rounded">
                Authorization is required for most video upload or deletion endpoints. See <Link to="/api/auth" className={Design.URL}>Authentication</Link>.
            </aside>
            <APIDescriber method="GET" endpoint="/api/v1/video/upload/sas">
                Retrieve an <a href="https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview" className={Design.URL}>Azure Shared Access Signature</a> for use when uploading a video or thumbnail file to the storage container.
            </APIDescriber>
            <APIDescriber method="POST" endpoint="/api/v1/video/upload">
                Insert a new video. Uses JSON object similar to GET /api/v1/video/[videoId]. Requires the video file to have been uploaded beforehand, though storage APIs.
            </APIDescriber>
            <APIDescriber method="POST" endpoint="/api/v1/video/[videoId]/view">
                Adds a single view to the video.
            </APIDescriber>
            <APIDescriber method="DELETE" endpoint="/api/v1/video/[videoId]">
                Removes a video. Will also delete all associated comments. Can only be called by the video uploader, otherwise will return 403 Forbidden.
            </APIDescriber>
        </div>
        </>
    )
}