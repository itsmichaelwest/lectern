import React, { Component } from 'react'

export default class VideoPlayer extends Component {
    render () {
        return (
            <video className="w-full bg-black rounded">
                <source src={this.props.mp4} type="video/mp4" />
            </video>
        )
    }
}