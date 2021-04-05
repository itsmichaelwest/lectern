import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Design from '../Design'
import UploadVideo from '../functions/video/upload'
import { Formik, Field, Form } from 'formik'
import { Link, Prompt } from 'react-router-dom'
import UploadSkeleton from '../components/skeletons/UploadSkeleton'
import FileDropper from '../components/atoms/upload/FileDropper'
import FileInfo from '../components/atoms/upload/FileInfo'

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
        selectedFile: null
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
        this.setState({
            selectedFile: file[0],
        })
    }

    handleFileRemoval() { this.resetState() }

    render () {
        return (
            <>
            <Prompt
                when={this.state.selectedFile}
                message='Leave page? This video won&apos;t be uploaded' />
            <Helmet>
                <title>Upload Video | Lectern</title>
            </Helmet>
            <div>
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold font-header mt-16 mb-8">Upload Video</h1>
                        <p>By uploading a video, you agree to our <Link to="/community-standards" className={Design.URL}>Community Standards</Link>.</p>
                    </div>
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            privacy: 0
                        }}
                        onSubmit={async (values) => {
                            await UploadVideo(this.state.selectedFile, values, (callback) => {
                                if (callback === true) {
                                    console.log('[Upload] The upload was successful')
                                    alert("Video was uploaded, you can navigate away now!")
                                } else {
                                    console.error('[Upload] The upload wasn\'t successful')
                                    alert("Video wasn't uploaded, something went wrong")
                                }
                            })
                        }}>
                        <Form className="lg:w-3/6 md:w-4/6 w-full mx-auto" autoComplete="off">
                            {
                                this.state.selectedFile 
                                ?
                                <FileInfo name={this.state.selectedFile.name} size={this.state.selectedFile.size} removeFile={this.handleFileRemoval} />
                                :   
                                <FileDropper onDrop={(file) => this.handleFileSelection(file)} />
                            }

                            <div className="my-8">
                                <label className="font-semibold" htmlFor="title">Title</label>
                                <div className="mt-2">
                                    <Field id="title" name="title" type="text" className={Design.Input + " w-full"} />
                                </div>
                                <span className="text-xs text-gray-600">Max 500 characters</span>
                            </div>

                            <div className="my-8">
                                <label className="font-semibold" htmlFor="description">Description</label>
                                <div className="mt-2">
                                    <Field id="description" name="description" as="textarea" className={Design.Input + " w-full"} style={{ resize: 'none' }} />
                                </div>
                                <span className="text-xs text-gray-600">Max 4000 characters</span>
                            </div>

                            <div className="flex justify-between">
                                <div className="h-0">
                                    <label className="font-semibold" htmlFor="privacy">Privacy</label>
                                    <div className="my-2">
                                        <Field as="select" id="privacy" name="privacy" className={Design.InputDropdown + " w-32"}>
                                            <option value="0" label="Public" />
                                            <option value="1" label="Unlisted" />
                                            <option value="2" label="Private" />
                                        </Field>
                                    </div>
                                    <Link to="/aaaa" className={Design.URL + " text-xs"}>
                                        Learn more about privacy options
                                    </Link>
                                </div>
                                <div className="mt-7">
                                    <button className={Design.ButtonPrimary} type="submit">Upload</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                :
                <>
                <UploadSkeleton />
                </>
                }
            </div>
            </>
        )
    }
}
