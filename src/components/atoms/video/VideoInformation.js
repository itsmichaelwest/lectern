import React, { Component } from 'react'
import axios from 'axios'
import config from '../../../config'
import { Link } from 'react-router-dom'
import Design from '../../../designSystem'

export default class Video extends Component {
    likeVideo = () => {
        axios
        .post(`${config.apiUrl}/api/v1/video/${this.props.id}/like`)
        .catch(err => {
            console.log(
                `**(Video) User is not logged.`
            )
        })
    }


    unlikeVideo = () => {
        axios
        .delete(`${config.apiUrl}/api/v1/video/${this.props.id}/like`)
        .catch(err => {
            console.log(
                `**(Video) User is not logged.`
            )
        })
    }


    render () {
        return (
            <div>
                <h1 className="text-xl font-bold">{this.props.title}</h1>
                <p className="text-gray-600 mt-4">{this.props.description}</p>
                <div className="flex justify-between items-center my-8">
                    <div>
                        <p>{this.props.views} views</p>
                        <p>{this.props.date}</p>
                    </div>
                    <div>
                        <button className={Design.pButton} onClick={this.likeVideo}>
                            {this.props.likes}
                            Favorite
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Link className="flex flex-row items-center font-bold" to={'/channel/' + this.props.id}>
                        <div className="flex-initial rounded-full bg-primary h-8 w-8 mr-2">
                            {/* put an image here ok */}
                        </div>
                        {this.props.channelName}
                    </Link>
                </div>
            </div>
        )
    }
}
