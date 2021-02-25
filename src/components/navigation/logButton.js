import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
export default class LogButton extends Component {
    constructor (props) {
        super(props)
        this.state = {
            displayName: null,
            isLogged: false,
            menuSelected: false
        }
    }

    componentDidMount () {
        this.checkLogin()
    }

    checkLogin() {
        axios
        .get(`${config.apiUrl}/auth/microsoft/graph`, {withCredentials: true})
        .then(response => {
            console.log(response)
            this.setState({
                displayName: `${response.data.givenName} ${response.data.surname}`,
                isLogged: true
            })
        })
        .catch(err => {
            this.setState({
                isLogged: false
            })
        })
    }

    showMenu() {
        console.log(`Menu pressed!`)
        this.setState({
            menuSelected: !this.state.menuSelected
        })
    }

    render() {
        if (!this.state.isLogged) {
            return (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <Link to="/login" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700">
                        Sign in
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <button onClick={this.showMenu.bind(this)} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-gray-400 border-gray-400 hover:border-yellow-700 hover:text-yellow-700 cursor-pointer">
                        {this.state.displayName}
                    </button>
                    {AccountMenu(this.state)}
                </div>
            )
        }
    }
}

function AccountMenu(state) {
    if (state.menuSelected) {
        return (
            <div className="origin-top-right absolute top-16 mt-2 w-56 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        Account settings
                    </Link>
                    <a href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        Sign out
                    </a>
                </div>
            </div>
        )
    }
}