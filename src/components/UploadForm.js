import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Input, InputDropdown, ButtonPrimary } from '../Design'
import uploadVideo from '../functions/uploadVideo'
import FileDropper from './atoms/upload/FileDropper'
import FileInfo from './atoms/upload/FileInfo'

// UploadForm component, accepts a file using the FileDropper and values such as
// video title, description, and privacy. Passes these values to the uploadVideo
// function.
export default function UploadForm(props) {
    const [isLoadingBytes, setIsLoadingBytes] = useState(false)
    const [loadedBytes, setLoadedBytes] = useState(0)

    function setInitialState() {
        props.setSelectedFile(null)
        setIsLoadingBytes(false)
        setLoadedBytes(0)
    }

    function handleFileSelection(file) {
        if (file.length > 0) {
            const videoObj = URL.createObjectURL(file[0])
            let videoTempContainer = document.getElementById('tempVideo')
            videoTempContainer.src = videoObj
            props.setSelectedFile(file[0])
        }
    }

    function updateLoadedBytes(bytes) {
        setIsLoadingBytes(true)
        setLoadedBytes(bytes)
    }

    function validateField(value) {
        if (!value) return 'Please fill out this field'
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                privacy: 0
            }}
            onSubmit={async (values) => {
                if (props.onSubmit) {
                    await props.onSubmit(values)
                } else {
                    await uploadVideo(
                        props.selectedFile, 
                        values, 
                        callback => {
                        if (callback !== null) {
                            props.setSelectedFile(null)
                            props.setUploadStatus(callback)
                        } else {
                            console.error('[Upload] The upload wasn\'t successful')
                            alert("Video wasn't uploaded, something went wrong")
                        }
                    }, progress => {
                        updateLoadedBytes(progress)
                    })
                }
            }}>
            <Form className="lg:w-3/6 md:w-4/6 w-full mx-auto" autoComplete="off">
                {
                    props.selectedFile 
                    ?
                    <FileInfo 
                        name={props.selectedFile.name} 
                        size={props.selectedFile.size} 
                        removeFile={setInitialState} 
                        isLoading={isLoadingBytes} 
                        loadedBytes={loadedBytes} />
                    :   
                    <FileDropper onDrop={(file) => handleFileSelection(file)} />
                }

                <div className="my-8">
                    <label className="font-semibold dark:text-white" htmlFor="title">
                        Title
                    </label>
                    <div className="mt-2">
                        <Field 
                            id="title" 
                            name="title" 
                            type="text" 
                            className={Input + " w-full"} 
                            disabled={isLoadingBytes}
                            validate={validateField} />
                        <div className="text-xs text-red-600 my-2">
                            <ErrorMessage name="title"/>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600">
                        Max 1000 characters
                    </span>
                </div>

                <div className="my-8">
                    <label className="font-semibold dark:text-white" htmlFor="description">
                        Description
                    </label>
                    <div className="mt-2">
                        <Field 
                            id="description" 
                            name="description" 
                            as="textarea" 
                            className={Input + " w-full"} 
                            style={{ resize: 'none' }} 
                            disabled={isLoadingBytes} 
                            validate={validateField} />
                        <div className="text-xs text-red-600 my-2">
                            <ErrorMessage name="description"/>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600">
                        Max 2000 characters
                    </span>
                </div>

                <div className="flex justify-between">
                    <div className="h-0">
                        <label className="font-semibold dark:text-white" htmlFor="privacy">Privacy</label>
                        <div className="my-2">
                            <Field 
                                as="select" 
                                id="privacy" 
                                name="privacy" 
                                className={InputDropdown + " w-32"} 
                                disabled={isLoadingBytes}>
                                <option value="0" label="Public" />
                                <option value="1" label="Unlisted" />
                            </Field>
                        </div>
                    </div>
                    <div className="mt-7">
                    { !isLoadingBytes &&
                        <button className={ButtonPrimary} type="submit">Upload</button>
                    }
                    </div>
                </div>
            </Form>
        </Formik>
    )
}