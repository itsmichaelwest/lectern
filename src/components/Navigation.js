import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

import LogButton from './navigation/logButton'

export default class Navigation extends Component {
    render() {
        return (
            <header className="relative mb-8 shadow-sm">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-6 md:space-x-10">
                        <div className="flex-1 justify-start">
                            <a href="/" className="group text-base font-medium">
                                CS39440 <span className="text-yellow-600 group-hover:text-yellow-900 font-bold">β</span>
                            </a>
                        </div>
                        <div>
                            <form>
                                <input type="text" placeholder="Search for videos" id="navSearchBox" className="px-4 py-2 rounded-md border border-gray-300 hover:border-gray-700 focus:border-yellow-600 outline-none w-48 sm:w-64 lg:w-96 transition-all text-center hover:text-left focus:text-left hover:bg-gray-50 focus:bg-gray-50" />
                            </form>
                        </div>
                        <LogButton/>
                    </div>
                </div>
            </header>
        )
    }
}