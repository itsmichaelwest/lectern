import React from 'react'
import ThumbnailSkeleton from './ThumbnailSkeleton'

export const VideoRowSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <ThumbnailSkeleton/>
        <ThumbnailSkeleton/>
        <ThumbnailSkeleton/>
    </div>
)

export default VideoRowSkeleton
