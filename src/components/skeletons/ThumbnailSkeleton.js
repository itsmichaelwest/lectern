import React from 'react'

export const ThumbnailSkeleton = () => (
    <div>
        <div className="shimmer rounded-lg mb-2" style={{ height: 0, paddingBottom: '56.25%' }}></div>
        <div className="shimmer rounded w-3/5 h-4 my-1"></div>
        <div className="shimmer rounded w-4/5 h-4 mt-1"></div>
    </div>
)

export default ThumbnailSkeleton