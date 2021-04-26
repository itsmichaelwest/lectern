import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import APIDescriber from './APIDescriber'
import { Helmet } from 'react-helmet'
import APIPublicPreview from './APIPublicPreview'

export default function ChannelAPIDocs() {
    const cell = 'border border-gray-200 text-sm p-2 align-top'
    const cellCode = cell + ' font-mono'

    const dataObject = `
    {
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

    const videosReturnObject = `
    [
        {
            "videoID": "c50aec0b-2f86-4a6c-a3a0-a61671bbe4f1",
            "streamUrl": "https://cs394lecternvideos.blob.core.windows.net/videos/c50aec0b-2f86-4a6c-a3a0-a61671bbe4f1",
            "privacy": 0,
            "author": "d1b2b6bb-7888-455c-a202-b8659250a2fd",
            "authorDisplayName": "Alex Smith",
            "uploaded": "2021-04-07T22:34:49.915Z",
            "title": "Sample Video",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor sodales lorem, eget consectetur massa malesuada a. Proin viverra sed tellus at finibus.",
            "length": null,
            "views": 28,
            "thumbnail": null
        },
        {...}
    ]
    `

    return (
        <>
        <Helmet>
            <title>Channel - API | Lectern</title>
        </Helmet>
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-3xl text-gray-700 font-header font-bold mb-4">
                Channel (<span className="font-mono">/api/v1/channel</span>)
            </h1>
            <h2 className="text-xl font-header font-bold mb-4">
                Data model and types
            </h2>
            <SyntaxHighlighter 
                language="json"
                wrapLongLines={true} 
                style={docco} 
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
                    <tr>
                        <td className={cellCode}>
                            suspended
                        </td>
                        <td className={cellCode}>
                            boolean
                        </td>
                        <td className={cell}>
                            If this channel has been suspended/terminated or not.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 className="text-xl font-header font-bold mt-24 -mb-8">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]">
                Returns a Channel data object containing information about the
                specified channel.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]/videos">
                Returns an array of Video objects associated with the channel:
                <SyntaxHighlighter 
                    language="json"
                    wrapLongLines={true} 
                    style={docco} 
                    className="rounded-xl mt-4">
                    {videosReturnObject}            
                </SyntaxHighlighter>
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]/all">
                Returns an array containing both the main Channel data object,
                and an array containing the Video objects associated with the
                channel.
            </APIDescriber>
        </div>
        </>
    )
}