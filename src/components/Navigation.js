import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LogButton from './navigation/logButton'

export default class Navigation extends Component {
    render() {
        return (
            <header className="sticky top-0 bg-white bg-opacity-90 mb-8 shadow-sm z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4 md:space-x-10">
                        <div className="flex-initial justify-start">
                            <Link to="/" className="group text-base font-medium">
                                CS39440 <span className="text-primary-600 group-hover:text-primary-900 font-bold">β</span>
                            </Link>
                        </div>
                        <div className="self-center">
                            <form>
                                <input type="text" placeholder="Search for videos" id="navSearchBox" className="px-4 py-2 mx-auto text-sm rounded-md border border-gray-300 hover:border-gray-700 focus:border-primary-600 outline-none w-48 sm:w-64 lg:w-96 transition-all text-center hover:text-left focus:text-left hover:bg-gray-50 focus:bg-gray-50" />
                            </form>
                        </div>
                        <LogButton/>
                    </div>
                </div>
            </header>
        )
    }
}