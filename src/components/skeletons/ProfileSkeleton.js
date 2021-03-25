import React from 'react'
import VideoRowSkeleton from './VideoRowSkeleton'

export const ProfileSkeleton = () => (
    <>
    <div className="shimmer rounded max-w-md h-9 mx-auto"></div>
    <div className="shimmer rounded max-w-xs h-5 mx-auto my-4"></div>
    <div className="shimmer rounded w-32 h-9 mx-auto"></div>
    <VideoRowSkeleton/>
    </>
)

export default ProfileSkeleton
