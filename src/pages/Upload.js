import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Design from '../designSystem'
import UploadVideo from '../functions/video/upload'
import { Formik, Field, Form } from 'formik'
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadStatus: false,
            selectedFile: null
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

    handleFileSelection = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
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
                        <p>By uploading a video, you agree to the Terms and Conditions.</p>
                    </div>
                    <Formik
                        initialValues={{
                            title: '',
                            description: ''
                        }}
                        onSubmit={async (values) => {
                            await UploadVideo(this.state.selectedFile, values)
                        }}>
                        <Form>
                            <label className="mr-2 font-semibold" htmlFor="videoFile">Choose file</label>
                            <input id="videoFile" name="videoFile" type="file" onChange={this.handleFileSelection} />

                            <label className="mr-2 font-semibold" htmlFor="title">Title</label>
                            <Field className={Design.input} id="title" name="title" />

                            <label className="mr-2 font-semibold" htmlFor="description">Description</label>
                            <Field className={Design.input} id="description" name="description" />
                            
                            <div id="privacyGroup">Privacy</div>
                            <div role="group" aria-labelledby="privacyGroup">
                                <label>
                                    <Field type="radio" name="privacy" value="0" />
                                    Public
                                </label>
                                <label>
                                    <Field type="radio" name="privacy" value="1" />
                                    Unlisted
                                </label>
                                <label>
                                    <Field type="radio" name="privacy" value="2" />
                                    Private
                                </label>
                            </div>

                            <button className={Design.pButton} type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
                :
                <>
                </>
                }
            </div>
            </>
        )
    }
}
