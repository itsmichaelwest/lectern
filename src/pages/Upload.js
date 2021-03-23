import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import Design from '../designSystem'
import UploadVideo from '../functions/video/upload'
import { Formik, Field, Form } from 'formik'
import { Link } from 'react-router-dom'
import BMF from 'browser-md5-file'
import Dropzone from 'react-dropzone'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadStatus: false,
            selectedFile: null,
            selectedFileMD5: null
        }
    }

    componentDidMount () {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(response => {
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

    // Generate MD5 and store file when the file picker is changed.
    handleFileSelection = event => {
        new BMF().md5(
            event.target.files[0],
            (err, hash) => {
                //console.error('error', err)
                this.setState({
                    selectedFile: event.target.files[0],
                    selectedFileMD5: hash
                })
                console.log(this.state)
            },
        )
    }

    render () {
        return (
            <>
            <Helmet>
                <title>Upload Video | Lectern</title>
            </Helmet>
            <div>
                {this.state.auth
                ?
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold mt-16 mb-8">Upload Video</h1>
                        <p>By uploading a video, you agree to our <Link to="/community-standards" className={Design.URL}>Community Standards</Link>.</p>
                    </div>
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            privacy: 0
                        }}
                        onSubmit={async (values) => {
                            await UploadVideo(this.state.selectedFile, this.state.selectedFileMD5, values)
                        }}>
                        <Form className="lg:w-3/6 md:w-4/6 w-full mx-auto">
                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                {({getRootProps, getInputProps, isDragActive}) => (
                                    <section className="rounded-xl border border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 w-full">
                                        <div className="w-full h-full py-24 px-16 text-center outline-none" {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {
                                                isDragActive ?
                                                <div className="h-24">
                                                    <p className="pt-10 font-bold text-primary">
                                                        Drop your file here!
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
                                                    <p className="text-gray-500">
                                                        Acceptable file types: MP4, MOV, WEBM, AVI
                                                    </p>
                                                </div>
                                            }

                                        </div>
                                    </section>
                                )}
                            </Dropzone>

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
                                    <button className={Design.PrimaryButton} type="submit">Upload</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
                :
                <>
                <div className="text-center mb-16">
                    <div className="shimmer w-96 rounded mx-auto mt-16 mb-8" style={{ height: '3.75rem' }}></div>
                    <div className="shimmer w-96 rounded mx-auto h-5 mb-16"></div>
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
                </>
                }
            </div>
            </>
        )
    }
}
