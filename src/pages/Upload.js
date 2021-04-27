import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Design from '../Design'
import UploadVideo from '../functions/uploadVideo'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { Link, Prompt } from 'react-router-dom'
import UploadSkeleton from '../components/skeletons/UploadSkeleton'
import FileDropper from '../components/atoms/upload/FileDropper'
import FileInfo from '../components/atoms/upload/FileInfo'
import Thumbnail from '../components/atoms/video/Thumbnail'

export default class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        
        // Bind functions
        this.handleFileSelection = this.handleFileSelection.bind(this)
        this.handleFileRemoval = this.handleFileRemoval.bind(this)
    }

    getInitialState = () => ({
        uploadStatus: false,
        selectedFile: null,
        isLoadingBytes: false,
        loadedBytes: 0
    })

    resetState = () => {
        this.setState(this.getInitialState())
    }

    componentDidMount () {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(() => {
            this.setState({
                auth: true
            })
        })
        .catch(err => {
            console.error(err)
            localStorage.removeItem('user')
            window.location.replace('/login')
        })
    }

    // Warn user that their changes won't be
    componentDidUpdate = () => {
        if (this.state.selectedFile) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    handleFileSelection(file) {
        if (file.length > 0) {
            const videoObj = URL.createObjectURL(file[0])
            let videoTempContainer = document.getElementById('tempVideo')
            videoTempContainer.src = videoObj
            this.setState({
                selectedFile: file[0],
            })
        }
    }

    handleFileRemoval() { this.resetState() }

    updateLoadedBytes(bytes) {
        this.setState({
            isLoadingBytes: true,
            loadedBytes: bytes
        })
    }

    validateField(value) {
        if (!value) {
            return 'Please fill out this field'
        }
    }

    render () {
        return (
            <>
            <Prompt
                when={this.state.selectedFile}
                message='Leave page? This video won&apos;t be uploaded' />
            <Helmet>
                <title>Upload Video | Lectern</title>
            </Helmet>
            <div className="px-4 sm:px-0">
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl dark:text-white font-bold font-header mt-16 mb-8">Upload Video</h1>
                        <p className="dark:text-gray-100">By uploading a video, you agree to our <Link to="/community-standards" className={Design.URL}>Community Standards</Link>.</p>
                    </div>
                    { !this.state.uploadStatus 
                    ? 
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            privacy: 0
                        }}
                        onSubmit={async (values) => {
                            await UploadVideo(
                                this.state.selectedFile, 
                                values, 
                                callback => {
                                if (callback !== null) {
                                    this.setState({
                                        selectedFile: null,
                                        uploadStatus: callback
                                    })
                                } else {
                                    console.error('[Upload] The upload wasn\'t successful')
                                    alert("Video wasn't uploaded, something went wrong")
                                }
                            }, progress => {
                                this.updateLoadedBytes(progress)
                            })
                        }}>
                        <Form className="lg:w-3/6 md:w-4/6 w-full mx-auto" autoComplete="off">
                            {
                                this.state.selectedFile 
                                ?
                                <FileInfo 
                                    name={this.state.selectedFile.name} 
                                    size={this.state.selectedFile.size} 
                                    removeFile={this.handleFileRemoval} 
                                    isLoading={this.state.isLoadingBytes} 
                                    loadedBytes={this.state.loadedBytes} />
                                :   
                                <FileDropper onDrop={(file) => this.handleFileSelection(file)} />
                            }

                            <div className="my-8">
                                <label className="font-semibold dark:text-white" htmlFor="title">Title</label>
                                <div className="mt-2">
                                    <Field 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className={Design.Input + " w-full"} 
                                        disabled={this.state.isLoadingBytes}
                                        validate={this.validateField} />
                                    <div className="text-xs text-red-600 my-2">
                                        <ErrorMessage name="title"/>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-600">Max 500 characters</span>
                            </div>

                            <div className="my-8">
                                <label className="font-semibold dark:text-white" htmlFor="description">Description</label>
                                <div className="mt-2">
                                    <Field 
                                        id="description" 
                                        name="description" 
                                        as="textarea" 
                                        className={Design.Input + " w-full"} 
                                        style={{ resize: 'none' }} 
                                        disabled={this.state.isLoadingBytes} 
                                        validate={this.validateField} />
                                    <div className="text-xs text-red-600 my-2">
                                        <ErrorMessage name="description"/>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-600">Max 2000 characters</span>
                            </div>

                            <div className="flex justify-between">
                                <div className="h-0">
                                    <label className="font-semibold dark:text-white" htmlFor="privacy">Privacy</label>
                                    <div className="my-2">
                                        <Field as="select" id="privacy" name="privacy" className={Design.InputDropdown + " w-32"} disabled={this.state.isLoadingBytes}>
                                            <option value="0" label="Public" />
                                            <option value="1" label="Unlisted" />
                                        </Field>
                                    </div>
                                </div>
                                <div className="mt-7">
                                { !this.state.isLoadingBytes &&
                                    <button className={Design.ButtonPrimary} type="submit">Upload</button>
                                }
                                </div>
                            </div>
                        </Form>
                    </Formik>
                    :
                    <div className="text-center">
                        <div className="lg:w-3/6 md:w-4/6 w-full mx-auto">
                            <Thumbnail 
                                key={this.state.uploadStatus.videoId} 
                                id={this.state.uploadStatus.videoId} 
                                title={this.state.uploadStatus.title} 
                                description={this.state.uploadStatus.description}
                                length={this.state.uploadStatus.vidLength}
                                thumb={this.state.uploadStatus.thumbnail}
                            />
                        </div>
                        <p className="text-xl mt-8">
                            🎉 Your video was successfully uploaded! ✨
                        </p>
                    </div>
                    }
                </div>
                :
                <UploadSkeleton />
                }
            </div>
            <div className="fixed top-0 left-0 invisible">
                {/* hidden div used to */}
                <video id="tempVideo"/>
            </div>
            </>
        )
    }
}
