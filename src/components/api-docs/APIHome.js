import React from 'react'
import { Link } from 'react-router-dom'
import Design from '../../Design'
import InProgressSVG from '../../vectors/undraw-inprogress.svg'
import APIPublicPreview from './APIPublicPreview'

export const APIHome = () => (
    <>
        <div>
            <img src={InProgressSVG} className="h-96 mx-auto" alt="Illustration of someone with gears." />
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-6xl font-bold mt-16 mb-8">
                    Lectern API
                </h1>
                <div className="prose mx-auto">
                    <p>
                        Want to get started building your own app to access Lectern? You're in the right place, use
                        our API documentation to understand how to access Lectern resources.
                    </p>
                    <APIPublicPreview/>
                    <div className="text-left flex flex-col">
                        <Link to="/api/auth" className={Design.URL} >
                            Authentication
                        </Link>
                        <Link to="/api/channel"className={Design.URL} >
                            Channel
                        </Link>
                        <Link to="/api/comment" className={Design.URL} >
                            Comment
                        </Link>
                        <Link to="/api/video" className={Design.URL} >
                            Video
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    </>
)

export default APIHome
