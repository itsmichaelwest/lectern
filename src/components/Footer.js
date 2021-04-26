import React from 'react'
import { Link } from 'react-router-dom'
import { URL } from '../Design'

export default function Footer() {
    return (
        <footer>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 mt-24 pb-8">
                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between text-xs text-gray-400">
                    <p>
                        © 2021
                    </p>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        { process.env.REACT_APP_TESTING &&
                        <a href="https://forms.office.com/r/dTwt11mxn7" className={URL}>
                            Send Feedback
                        </a>
                        }
                        <Link to="/api" className={URL}>
                            API
                        </Link>
                        <Link to="/community-standards" className={URL}>
                            Community Standards
                        </Link>
                        <Link to="/participation" className={URL}>
                            Participation Agreement
                        </Link>
                        <Link to="/privacy" className={URL}>
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}