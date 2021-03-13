import React, { Component } from 'react'
import Comment from '../comment/Comment'

export default class VideoComments extends Component {
    render () {
        return (
            <div>
                <div className="border rounded h-full max-h-64 overflow-y-scroll">
                    <Comment name="Hello" content="Test" />

                </div>
            </div>
        )
    }
}