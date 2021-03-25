import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

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
        accept: 'video/mp4, video/quicktime, video/webm, video/x-msvideo',
        maxFiles: 1,
        maxSize: 4294967296 
    })

    return (
        <div className="rounded-xl border border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 w-full cursor-pointer">
            <div className="w-full h-full py-24 px-16 text-center outline-none" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <div className="h-24">
                        <p className="pt-10 text-gray-600">
                            Drop here to upload
                        </p>
                    </div>
                    :
                    <div className="h-24">
                        <svg className="mx-auto" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 5.5C3.45507 5.5 2 6.95508 2 8.75V19.25C2 21.0449 3.45507 22.5 5.25 22.5H15.7523C17.5472 22.5 19.0023 21.0449 19.0023 19.25V17.6707L23.5434 20.7824C24.3729 21.3508 25.4999 20.7568 25.4999 19.7512V8.24842C25.4999 7.24298 24.3732 6.64898 23.5436 7.21708L19.0023 10.3272V8.75C19.0023 6.95508 17.5472 5.5 15.7523 5.5H5.25ZM19.0023 15.8524V12.1452L23.9999 8.72263V19.2769L19.0023 15.8524ZM17.5023 8.75V19.25C17.5023 20.2165 16.7187 21 15.7523 21H5.25C4.2835 21 3.5 20.2165 3.5 19.25V8.75C3.5 7.7835 4.2835 7 5.25 7H15.7523C16.7188 7 17.5023 7.7835 17.5023 8.75Z" fill="#8FB339"/>
                        </svg>
                        <p className="my-2">
                            Drag and drop a file here to upload or select to open a file picker
                        </p>
                        <p className="text-gray-600">
                            Acceptable file types: MP4, MOV, WEBM, AVI
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                            Max file size: 4 GiB
                        </p>
                    </div>
                }

            </div>
        </div>
    )
}