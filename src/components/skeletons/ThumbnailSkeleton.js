import React from 'react'

export const ThumbnailSkeleton = () => (
    <div>
        <div className="shimmer rounded-lg mb-2" style={{ height: 0, paddingBottom: '56.25%' }}></div>
        <div className="shimmer rounded w-3/5 my-1" style={{ height: '18px' }}></div>
        <div className="shimmer rounded w-4/5 h-5"></div>
    </div>
)

export default ThumbnailSkeleton