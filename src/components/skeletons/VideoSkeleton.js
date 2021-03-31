import React from 'react'

export const VideoSkeleton = () => (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        <div className="shimmer w-full h-0 rounded" style={{ paddingBottom: '56.25%' }}></div> 
        <div className="shimmer w-full h-0 rounded" style={{ paddingBottom: '56.25%' }}></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        <div className="w-full">
            <div className="shimmer w-4/5 rounded" style={{ height: '28px' }}></div>
            <div className="shimmer w-full h-12 mt-4 rounded"></div>
            <div className="flex justify-between my-8">
                <div className="shimmer w-2/5 h-12 rounded"></div>
                <div className="flex">
                    <div className="shimmer w-16 h-10 rounded"></div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="flex w-3/5 items-center">
                    <div className="shimmer flex-initial rounded-full h-8 w-8 mr-2"></div>
                    <div className="shimmer w-2/5 h-4 rounded"></div>
                </div>
            </div>
        </div>
    </div>
    </>
)

export default VideoSkeleton
