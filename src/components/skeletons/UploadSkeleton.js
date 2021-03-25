import React from 'react'

export const UploadSkeleton = () => (
    <div className="text-center mb-16">
        <div className="shimmer max-w-md rounded mx-auto mt-16 mb-8" style={{ height: '3.75rem' }}></div>
        <div className="shimmer max-w-sm rounded mx-auto h-5 mb-16"></div>
        <div className="lg:w-3/6 md:w-4/6 w-full mx-auto">
            <div className="shimmer w-full rounded-xl p-36"></div>
            <div className="shimmer w-32 h-5 rounded mt-8 mb-2"></div>
            <div className="shimmer w-full h-12 rounded-md"></div>
            <div className="shimmer w-32 h-5 rounded mt-8 mb-2"></div>
            <div className="shimmer w-full h-32 rounded-md"></div>
            <div className="flex justify-between">
                <div>
                    <div className="shimmer w-24 h-5 rounded mt-8"></div>
                    <div className="shimmer w-32 h-12 rounded-md my-2"></div>
                    <div className="shimmer w-40 h-4 rounded"></div>
                </div>
                <div>
                    <div className="shimmer w-24 h-12 rounded-md mt-16"></div>
                </div>
            </div>
        </div>
    </div>
)

export default UploadSkeleton
