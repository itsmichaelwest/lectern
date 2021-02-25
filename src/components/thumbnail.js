import { React, Component } from 'react'
import { Link } from 'react-router-dom'

export default class Thumbnail extends Component {
    render() {
        return(
            <>
            <Link to="/video/123">
                <div>
                    <div className="relative w-full h-40 bg-yellow-400 rounded-lg mb-2 shadow hover:shadow-lg">
                        <div className="bg-white font-semibold bg-opacity-40 px-2 py-1 rounded max-w-max absolute right-2 bottom-2">
                            00:00
                        </div>
                    </div>
                    <h5 className="font-semibold">{this.props.title}</h5>
                    <p className="text-gray-600">{this.props.description}</p>
                </div>
            </Link>
            </>
        )
    }
}