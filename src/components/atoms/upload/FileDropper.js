import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { ReactComponent as VideoIcon } from '../../../icons/video_28_regular.svg'

// FileDropper component, based on react-dropzone. Accepts a file on drag-drop or
// by clicking to open a file browser. Will send the accepted file back to the
// parent component.
export default function FileDropper(props) {
    const [fileError, setFileError] = useState(false)

    // Send the accepted files back
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setFileError(false)
            props.onDrop(acceptedFiles)
        } else {
            setFileError(true)
        }
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
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-900 w-full cursor-pointer">
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
                        <p className="text-gray-600 dark:text-gray-400">
                            Drop here to upload
                        </p>
                    </div>
                    :
                    <div className="py-24 px-16">
                        <VideoIcon className="mx-auto" fill="#8eb339" />
                        <p className="my-2 dark:text-white">
                            Drag and drop or click/tap to choose a file
                        </p>
                        {
                            fileError ?
                            <p className="text-red-600 dark:text-red-400 font-semibold">
                                That video format cannot be uploaded, please select an MP4 file
                            </p>
                            :
                            <p className="text-gray-600 dark:text-gray-400">
                                Acceptable video formats: MP4
                            </p>
                        }
                        <p className="text-gray-400 dark:text-gray-600 text-xs mt-2">
                            Maximum file size: 4 GB
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}
