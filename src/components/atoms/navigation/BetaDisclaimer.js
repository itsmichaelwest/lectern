import React from 'react'

export default function BetaDisclaimer() {
    return (
        <div className="bg-primary-200">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-sm py-3 font-semibold">
                <div className="flex justify-between space-x-10 items-center">
                    <div className="flex-auto">
                        <div className="flex flex-row items-center">
                            <span className="bg-primary text-white px-2 py-1 rounded mr-2 flex-grow-0">
                                BETA
                            </span>
                            <div>
                                This service is in beta. Commenting and video playback functionality may be unreliable.
                            </div>
                        </div>
                    </div>
                    <div>
                        <a className="text-right hover:text-gray-600" href="mailto:maw86@aber.ac.uk?subject=Lectern%20Feedback">
                            Send feedback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}