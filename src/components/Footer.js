import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Footer extends Component {
    render() {
        return (
            <>
            <footer>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-24 mb-8">
                    <div className="text-xs text-gray-400">
                        <p className="float-left">
                            © 2021
                        </p>
                        <p className="float-right">
                            This site is a work in progress.
                        </p>
                    </div>

                </div>
            </footer>
            </>
        )
    }
}