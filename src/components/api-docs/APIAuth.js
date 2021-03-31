import React from 'react'
import APIDescriber from './APIDescriber'
import APIPublicPreview from './APIPublicPreview'

export default function AuthAPIDocs() {
    return (
        <div className="max-w-2xl mx-auto">
            <APIPublicPreview/>
            <h1 className="text-2xl font-bold mb-4">
                Authentication (<span className="font-mono">/auth</span>)
            </h1>
            <h2 className="text-xl font-bold mb-4">
                Endpoints
            </h2>
            <APIDescriber method="GET" endpoint="/auth/microsoft">
                Redirects the user to Microsoft 365 for authentication.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/microsoft/callback">
                Callback URL for Microsoft 365 authentication.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/microsoft/token">
                Gets an up-to-date login token for performing actions against the Microsoft Graph API.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/microsoft/graph">
                Retrieves Microsoft Graph user information.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/user">
                Gets user information stored in database.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/destroy">
                Removes the user from the service, deleting all their videos, comments, and other information.
            </APIDescriber>
            <APIDescriber method="GET" endpoint="/auth/logout">
                Logs the user out and destroys their session.
            </APIDescriber>
            <APIDescriber method="POST" endpoint="/auth/microsoft/callback">
                Callback URL for Microsoft 365 authentication.
            </APIDescriber>
        </div>
    )
}