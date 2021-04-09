import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config'
import Design from '../../../Design'

export default class AccountButton extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            id: null,
            name: null,
            avatar: null,
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
        .then(res => {
            this.setState({
                id: res.data.passport.user.oid,
                name: res.data.userName,
                isLogged: true
            })
            axios
            .get(`${config.apiUrl}/auth/userdb`, {withCredentials: true})
            .then(res => {
                let buffer = new Buffer(res.data.userPhoto, 'base64')
                let text = buffer.toString('ascii')
                this.setState({
                    avatar: text
                })
            })
        })
        .catch(err => {
            this.setState({
                isLogged: false
            })
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
                                <img 
                                    className="inline h-5 w-5 rounded-full overflow-hidden bg-gray-100 mr-2 border border-gray-200 shadow-sm" 
                                    src={`data:image/jpeg;base64,${this.state.avatar}`}
                                    alt={this.state.name + " avatar"} />
                            </span>
                            <span className="hidden md:inline">
                                <img 
                                    className="inline h-5 w-5 rounded-full overflow-hidden bg-gray-100 mr-2 border border-gray-200 shadow-sm" 
                                    src={`data:image/jpeg;base64,${this.state.avatar}`}
                                    alt={this.state.name + " avatar"} />
                                {this.state.name}
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
                                <img 
                                    className="inline h-5 w-5 rounded-full overflow-hidden bg-gray-100 mr-2 border border-gray-200 shadow-sm" 
                                    src={`data:image/jpeg;base64,${this.state.avatar}`}
                                    alt={this.state.name + " avatar"} />
                            </span>
                            <span className="hidden md:inline">
                                <img 
                                    className="inline h-5 w-5 rounded-full overflow-hidden bg-gray-100 mr-2 border border-gray-200 shadow-sm" 
                                    src={`data:image/jpeg;base64,${this.state.avatar}`}
                                    alt={this.state.name + " avatar"} />
                                {this.state.name}
                            </span>
                            <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20">
                                <path d="M5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303C10.2374 12.8232 9.76256 12.8232 9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967Z" fill="#6B7280"/>
                            </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={node => this.node = node}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link to={"/channel/" + this.state.id} className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={this.hideMenu}>
                                    <svg className="inline-block mr-2 h-5 w-5" viewBox="0 0 16 20">
                                        <path d="M6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7ZM5.49998 10L10.5 10C11.3284 10 12 10.6716 12 11.5C12 12.6161 11.541 13.5103 10.7879 14.1148C10.0466 14.7098 9.05308 15 8 15C6.94692 15 5.95342 14.7098 5.21215 14.1148C4.45897 13.5103 4 12.6161 4 11.5C4 10.6716 4.67156 10 5.49998 10ZM8 2C3.58172 2 0 5.58172 0 10C0 14.4183 3.58172 18 8 18C12.4183 18 16 14.4183 16 10C16 5.58172 12.4183 2 8 2ZM1 10C1 6.13401 4.13401 3 8 3C11.866 3 15 6.13401 15 10C15 13.866 11.866 17 8 17C4.13401 17 1 13.866 1 10Z" fill="#374151"/>
                                    </svg>
                                    Your profile
                                </Link>
                                <a href="/auth/logout" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                    <svg className="inline-block mr-2 h-5 w-5" viewBox="0 0 16 20">
                                        <path d="M6.5 11.25C6.91421 11.25 7.25 10.9142 7.25 10.5C7.25 10.0858 6.91421 9.75 6.5 9.75C6.08579 9.75 5.75 10.0858 5.75 10.5C5.75 10.9142 6.08579 11.25 6.5 11.25ZM9 3.5C9 3.3542 8.93636 3.21567 8.82575 3.12068C8.71514 3.02569 8.56857 2.98371 8.42445 3.00574L1.42445 4.07574C1.18032 4.11306 1 4.32303 1 4.57V15.43C1 15.6769 1.18028 15.8869 1.42438 15.9243L8.42438 16.9953C8.56851 17.0173 8.71509 16.9754 8.82572 16.8804C8.93635 16.7854 9 16.6468 9 16.501V10L14.1722 10L13.1753 10.8737C12.9679 11.0556 12.9468 11.3714 13.1284 11.5793C13.3099 11.7871 13.6253 11.8081 13.8328 11.6263L15.8295 9.8763C15.9379 9.78135 16 9.64419 16 9.50001C16 9.35583 15.9379 9.21867 15.8295 9.12372L13.8328 7.37372C13.6253 7.19188 13.3099 7.21294 13.1284 7.42076C12.9468 7.62858 12.9679 7.94446 13.1753 8.1263L14.1723 9.00002L9 9.00002V3.5ZM8 4.08224V15.9187L2 15.0007V4.99938L8 4.08224ZM10.5 16H10V11H11V15.5C11 15.7761 10.7761 16 10.5 16ZM10 8V4H10.5C10.7761 4 11 4.22386 11 4.5V8H10Z" fill="#374151"/>
                                    </svg>
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                    </>

                )
            }
        }
    }
}
