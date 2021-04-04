import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Design from '../../../Design'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showButtons: false
        }
    }

    setVideoTime(time) {
        let video = document.getElementById('video')
        video.currentTime = time
    }
    
    render() {
        return (
            <div className="p-4 hover:bg-gray-50"
                onMouseEnter={() => this.setState({ showButtons: true })}
                onMouseLeave={() => this.setState({ showButtons: false })}>
                {this.state.showButtons && (
                <div className="absolute">
                    
                </div>
                )}
                <div className="flex">
                    <span className="flex-initial flex-shrink-0 w-16 font-semibold hover:text-gray-600 cursor-pointer">
                        {this.props.time}
                    </span>
                    <div>
                        <div className="flex align-middle">
                            <span className={Design.URL + " font-semibold"}>
                                <Link to={`/channel/${this.props.author}`}>
                                    {this.props.name}
                                </Link>
                            </span>
                        </div>
                        <div>
                            <p>
                                {this.props.content}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}