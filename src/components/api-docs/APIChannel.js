import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import APIDescriber from './APIDescriber'
import { Link } from 'react-router-dom'
import Design from '../../Design'
import APIPublicPreview from './APIPublicPreview'

export default function ChannelAPIDocs() {
    const cell = 'border border-gray-200 text-sm p-2 align-top'
    const cellCode = cell + ' font-mono'

    const dataObject = `
    {
        "id": "d1b2b6bb-7888-455c-a202-b8659250a2fd",
        "displayName": "Alex Smith",
        "reported": false,
        "suspended": false
    }
    `

    return (
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-2xl font-bold mb-4">
                Channel (<span className="font-mono">/api/v1/channel</span>)
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
            <hr className="my-8"/>
            <h2 className="text-xl font-bold mb-4">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]">
                Returns information about the specified channel. Does not return a list of videos, this would bloat the return in the event we only need basic channel information.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]/videos">
                Returns an array of video objects associated with the channel.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/api/v1/channel/[channelId]/all">
                Returns an array containing both the information about the specified channel and a further array of the channel's videos.
            </APIDescriber>
            <aside className="bg-primary-50 p-2 rounded">
                Authorization is required for most video upload or deletion endpoints. See <Link to="/api/auth" className={Design.URL}>Authentication</Link>.
            </aside>
            <APIDescriber method="POST" endpoint="/api/v1/channel/[channelId]/report">
                Reports channel, flips the reported flag.
            </APIDescriber>
            <APIDescriber method="DELETE" endpoint="/api/v1/channel/[channelId]/report">
                Reverses reported flag.
            </APIDescriber>
        </div>
    )
}