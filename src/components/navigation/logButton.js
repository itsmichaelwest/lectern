import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'

export default class LogButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            displayName: null,
            isLogged: true
        }
    }

    componentWillMount () {
        axios
        .get(config.apiUrl + '/api/profile')
        .then(response => {
            this.setState({
                displayName: response.data.user.displayName,
                isLogged: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        if (!this.state.isLogged) {
            return (
                <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <a href="/#/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700">
                        Sign in
                    </a>
                </div>
            )
        } else {
            return (
                <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <a href="/#/profile" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-400 border-gray-400 hover:border-yellow-700 hover:text-yellow-700">
                        {this.state.displayName}
                    </a>
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Account settings</a>
                            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Settings
                            </a>
                            <form method="POST" action="/#/logout">
                                <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                                Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div> 
            )
        }
    }
}