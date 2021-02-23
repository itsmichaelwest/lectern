import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Footer extends Component {
    render() {
        return (
            <>
            <footer>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-24 pb-16">
                    <div className="text-xs text-gray-400">
                        <p className="float-left">
                            © 2021
                        </p>
                        <p className="float-right">
                            <Link to="/privacy" className="mr-4 text-yellow-600 hover:text-yellow-900">
                                Privacy policy
                            </Link>
                            This site is a work in progress.
                        </p>
                    </div>

                </div>
            </footer>
            </>
        )
    }
}