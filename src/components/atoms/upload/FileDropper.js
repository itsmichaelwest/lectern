import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { ReactComponent as VideoIcon } from '../../../icons/video_28_regular.svg'

export default function DropZone(props) {
    // Send the accepted files back
    const onDrop = useCallback(acceptedFiles => {
        props.onDrop(acceptedFiles)
    }, [props])

    const {
        getRootProps, 
        getInputProps, 
        isDragActive
    } = useDropzone({
        onDrop,
        accept: 'video/mp4',
        maxFiles: 1,
        maxSize: 4294967296 
    })

    return (
        <div className="rounded-xl border border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 w-full cursor-pointer">
            <div className="w-full h-full text-center outline-none" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <div 
                        className="px-16" 
                        style={{ 
                            paddingTop: 'calc(6rem + 44px)',
                            paddingBottom: 'calc(6rem + 44px)',
                        }}>
                        <p className="text-gray-600">
                            Drop here to upload
                        </p>
                    </div>
                    :
                    <div className="py-24 px-16">
                        <VideoIcon className="mx-auto" fill="#8eb339" />
                        <p className="my-2">
                            Drag and drop or click/tap to choose a file
                        </p>
                        <p className="text-gray-600">
                            Acceptable video formats: MP4
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                            Maximum file size: 4 GB
                        </p>
                    </div>
                }

            </div>
        </div>
    )
}
