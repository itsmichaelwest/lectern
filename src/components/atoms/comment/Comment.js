import React, { Component } from 'react'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showButtons: false
        }
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
                <div className="flex align-middle">
                    <div className="rounded-full w-5 h-5 bg-primary">

                    </div>
                    <span className="ml-2 font-semibold text-primary-700">
                        {this.props.name}
                    </span>
                </div>
                <div className="ml-7">
                    <p>
                        {this.props.content}
                    </p>
                </div>
            </div>
        )
    }
}