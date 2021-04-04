import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config'
import Design from '../../../Design'

export default class AccountButton extends React.Component {
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
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return
        }
        this.hideMenu()
    }

    checkLogin() {
        axios
        .get(`${config.apiUrl}/auth/user`, {withCredentials: true})
        .then(response => {
            this.setState({
                displayName: `${response.data.userName}`,
                isLogged: true
            })
        })
        .catch(err => {
            this.setState({
                isLogged: false
            })
            console.error(err)
        })
    }

    toggleMenu = () => {
        this.setState({
            menuSelected: !this.state.menuSelected
        })
    }

    hideMenu = () => {
        this.setState({
            menuSelected: false
        })
    }

    render() {
        if (!this.state.isLogged) {
            return (
                <div ref={node => this.node = node}>
                    <Link to="/login" className={Design.Button} id="options-menu" aria-haspopup="true" aria-expanded="true">
                        Sign in
                    </Link>
                </div>
            )
        } else {
            if (!this.state.menuSelected) {
                return (
                    <div className="relative inline-block text-left flex-initial" ref={node => this.node = node}>
                        <button type="button" className={Design.Button} id="options-menu" aria-haspopup="true" aria-expanded="true" ref={node => this.node = node} onClick={this.toggleMenu}>
                            <span className="inline md:hidden -mr-2">
                                <svg className="h-5 w-5" viewBox="0 0 16 20">
                                    <path d="M6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7ZM5.49998 10L10.5 10C11.3284 10 12 10.6716 12 11.5C12 12.6161 11.541 13.5103 10.7879 14.1148C10.0466 14.7098 9.05308 15 8 15C6.94692 15 5.95342 14.7098 5.21215 14.1148C4.45897 13.5103 4 12.6161 4 11.5C4 10.6716 4.67156 10 5.49998 10ZM8 2C3.58172 2 0 5.58172 0 10C0 14.4183 3.58172 18 8 18C12.4183 18 16 14.4183 16 10C16 5.58172 12.4183 2 8 2ZM1 10C1 6.13401 4.13401 3 8 3C11.866 3 15 6.13401 15 10C15 13.866 11.866 17 8 17C4.13401 17 1 13.866 1 10Z" fill="#374151"/>
                                </svg>
                            </span>
                            <span className="hidden md:inline">
                                {this.state.displayName}
                            </span>
                            <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20">
                                <path d="M5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303C10.2374 12.8232 9.76256 12.8232 9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967Z" fill="#6B7280"/>
                            </svg>
                        </button>
                    </div>
                )
            } else if (this.state.menuSelected) {
                return (
                    <>
                    <div className="relative inline-block text-left flex-initial" ref={node => this.node = node}>
                        <button type="button" className={Design.Button} id="options-menu" aria-haspopup="true" aria-expanded="true" ref={node => this.node = node} onClick={this.toggleMenu}>
                            <span className="inline md:hidden -mr-2">
                                <svg className="h-5 w-5" viewBox="0 0 16 20">
                                    <path d="M6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7ZM5.49998 10L10.5 10C11.3284 10 12 10.6716 12 11.5C12 12.6161 11.541 13.5103 10.7879 14.1148C10.0466 14.7098 9.05308 15 8 15C6.94692 15 5.95342 14.7098 5.21215 14.1148C4.45897 13.5103 4 12.6161 4 11.5C4 10.6716 4.67156 10 5.49998 10ZM8 2C3.58172 2 0 5.58172 0 10C0 14.4183 3.58172 18 8 18C12.4183 18 16 14.4183 16 10C16 5.58172 12.4183 2 8 2ZM1 10C1 6.13401 4.13401 3 8 3C11.866 3 15 6.13401 15 10C15 13.866 11.866 17 8 17C4.13401 17 1 13.866 1 10Z" fill="#374151"/>
                                </svg>
                            </span>
                            <span className="hidden md:inline">
                                {this.state.displayName}
                            </span>
                            <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20">
                                <path d="M5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303C10.2374 12.8232 9.76256 12.8232 9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967Z" fill="#6B7280"/>
                            </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={node => this.node = node}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={this.hideMenu}>Your profile</Link>
                                <a href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign out</a>
                            </div>
                        </div>
                    </div>
                    </>

                )
            }
        }
    }
}
