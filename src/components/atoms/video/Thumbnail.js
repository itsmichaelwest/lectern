import { React, Component } from 'react'
import { Link } from 'react-router-dom'

export default class Thumbnail extends Component {
    render() {
        return(
            <>
            <Link to={`/video/${this.props.id}`}>
                <div>
                    <div className="relative w-full bg-primary-900 rounded-lg mb-2 shadow hover:shadow-lg" style={{ height: 0, paddingBottom: '56.25%' }}>
                        <div className="bg-black text-white font-semibold bg-opacity-40 px-2 py-1 rounded max-w-max absolute right-2 bottom-2">
                            {this.props.length}
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