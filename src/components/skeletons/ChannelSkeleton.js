import React from 'react'

export const ChannelSkeleton = () => (
    <>
    <div className="shimmer rounded-xl">
        <div className="flex flex-col lg:flex-row items-center relative p-8">
            <div className="flex flex-col lg:flex-row items-center flex-auto">
                <div className="shimmer-darker flex-initial flex-shrink-0 rounded-full h-32 w-32 lg:mr-8"></div>
                <div className="shimmer-darker flex-initial my-4 lg:my-0 max-w-64 w-64 h-8 rounded"></div>
            </div>
        </div>
    </div>
    </>
)

export default ChannelSkeleton
