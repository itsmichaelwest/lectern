import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'

import ContentLoader from 'react-content-loader'

import { FileDrop } from 'react-file-drop'

import UploadVideo from '../functions/video/upload'

import { Formik } from 'formik'

import Design from '../designSystem'
export default class Profile extends Component {
    render () {
        return (
            <>
            <Helmet>
                <title>Upload Video | CS394</title>
            </Helmet>
            <div>
                <div className="text-center mb-16">
                    <div className="mx-auto w-2/5">
                    </div>
                    <h1 className="text-6xl font-bold mt-16 mb-8">Upload Video</h1>
                    <p>By uploading a video, you agree to the <Link className="text-yellow-600 hover:text-yellow-900">Terms of Service</Link>.</p>
                </div>
                <div className="w-full md:w-3/5 h-64 mx-auto my-8 rounded-xl border-2 border-dashed border-yellow-500 hover:border-yellow-700 hover:bg-gray-100 transition-all">
                    <FileDrop
                        className="w-full h-full"
                        targetClassName="flex items-center w-full h-full"
                        onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                        onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                        onFrameDrop={(event) => console.log('onFrameDrop', event)}
                        onDragOver={(event) => console.log('onDragOver', event)}
                        onDragLeave={(event) => console.log('onDragLeave', event)}
                        onDrop={(files, event) => UploadVideo(files)}>
                        <div className="text-md text-center my-auto mx-auto">
                            <svg className="mx-auto" width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.1768 20.7522L30.8336 26.409C31.3218 26.8972 31.3218 27.6886 30.8336 28.1768C30.3455 28.6649 29.554 28.6649 29.0658 28.1768L25.499 24.61L25.5 38C25.5 38.6472 25.0081 39.1795 24.3778 39.2435L24.25 39.25C23.6028 39.25 23.0704 38.7581 23.0064 38.1278L23 38L22.999 24.696L19.5199 28.1768C19.0317 28.6649 18.2403 28.6649 17.7521 28.1768C17.264 27.6886 17.264 26.8972 17.7521 26.409L23.409 20.7522C23.8971 20.264 24.6886 20.264 25.1768 20.7522ZM24.0011 9.01781C30.3382 9.01781 33.9331 13.2124 34.4559 18.2781L34.6158 18.2781C38.694 18.2781 42 21.5755 42 25.6431C42 29.7107 38.694 33.0082 34.6158 33.0082L29.25 33C28.6028 33 28.0704 32.5081 28.0064 31.8778L28 31.75C28 31.1028 28.4919 30.5705 29.1222 30.5065L29.25 30.5L34.8041 30.513C37.3982 30.513 39.5011 28.3992 39.5011 25.7916C39.5011 23.1841 37.3982 21.0703 34.8042 21.0703L33.3836 21.0703C32.6323 21.0703 31.9761 20.4782 31.9761 19.7236C31.9761 14.8998 28.2621 11.513 24.0011 11.513C19.74 11.513 16.0261 14.9609 16.0261 19.7236C16.0261 20.4782 15.3699 21.0703 14.6186 21.0703L13.198 21.0703C10.604 21.0703 8.50105 23.1841 8.50105 25.7916C8.50105 28.3992 10.604 30.513 13.198 30.513L18.75 30.5C19.4403 30.5 20 31.0596 20 31.75C20 32.3972 19.5081 32.9295 18.8778 32.9935L18.75 33L13.3864 33.0082C9.3082 33.0082 6.0022 29.7107 6.0022 25.6431C6.0022 21.6569 9.17728 18.4103 13.1427 18.282L13.5463 18.2781C14.0722 13.1791 17.664 9.01781 24.0011 9.01781Z"/>
                            </svg>
                            Drag to upload
                            <div className="text-sm my-1">
                                Acceptable file types: MP4
                            </div>
                        </div>
                    </FileDrop>
                </div>
                <div>
                    <Formik
                        initialValues={{ name: '' }}
                        validate={values => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = 'Required'
                            }
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting }) => 
                            console.log('Submit')
                        }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,   
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={Design.input}
                                    type="name"
                                    name="name"
                                    placeholder="Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name && errors.name}
                                <input
                                    className={Design.input}
                                    name="description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <button className={Design.pButton} type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            </>
        )
    }
}
