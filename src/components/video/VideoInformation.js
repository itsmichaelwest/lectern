import React, { Component } from 'react'
import axios from 'axios'
import config from '../../config'
import { Link } from 'react-router-dom'

export default class Video extends Component {
    likeVideo = () => {
        console.log(`**(Like) Liking comment...`)
        axios
        .post(`${config.apiUrl}/api/v1/video/${this.props.id}/like`)
        .then(response => {
            console.log(`**(Video) User is logged...`)
                this.setState({
                videoId: response.data
            })
        })
        .catch(err => {
            console.log(
                `**(Video) User is not logged.`
            )
        })
    }


    unlikeVideo = () => {
        console.log(`**(Like) Liking comment...`)
        axios
        .delete(`${config.apiUrl}/api/v1/video/${this.props.id}/like`)
        .then(response => {
            console.log(`**(Video) User is logged...`)
                this.setState({
                videoId: response.data
            })
        })
        .catch(err => {
            console.log(
                `**(Video) User is not logged.`
            )
        })
    }


    render () {
        return (
            <div>
                <h1 className="text-3xl font-bold">{this.props.title}</h1>
                <p>{this.props.description}</p>
                <div>
                    <p>{this.props.views}</p>
                    <p>{this.props.date}</p>
                </div>
                <div>
                    <button onClick={this.likeVideo}>
                        like the video
                    </button>
                    <button onClick={this.unlikeVideo}>
                        unlike the video
                    </button>
                </div>
                <div>
                    <Link className="font-bold">
                        {this.props.channelName}
                    </Link>
                    <p>
                        {this.props.subscribers}
                    </p>
                </div>
            </div>
        )
    }
}
