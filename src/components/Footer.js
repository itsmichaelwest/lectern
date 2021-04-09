import React from 'react'
import { Link } from 'react-router-dom'
import Design from '../Design'

export default function Footer() {
    return (
        <footer>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-24 pb-16">
                <div className="text-xs text-gray-400">
                    <p className="float-left">
                        © 2021
                    </p>
                    <div className="float-right">
                        <Link to="/api" className={Design.URL}>
                            API
                        </Link>
                        <Link to="/community-standards" className={Design.URL + " mx-4"}>
                            Community Standards
                        </Link>
                        <Link to="/privacy" className={Design.URL}>
                            Privacy Policy
                        </Link>
                        <p className="ml-4 inline">
                            This site is a work in progress.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}