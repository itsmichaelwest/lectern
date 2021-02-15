import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

import LogButton from './navigation/logButton'

export default class Navigation extends Component {
    render() {
        return (
            <header className="relative bg-white mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="/#/" className="text-base font-medium">
                            cs394
                            </a>
                        </div>
                        <LogButton/>
                    </div>
                </div>
            </header>
        )
    }
}