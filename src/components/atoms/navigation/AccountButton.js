import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../config'
import Design from '../../../Design'

import { ReactComponent as DropdownIcon } from '../../../vectors/dropdown.svg'
import { ReactComponent as ProfileIcon } from '../../../icons/person_circle.svg'
import { ReactComponent as SignOutIcon } from '../../../icons/sign_out.svg'

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
                            <DropdownIcon/>
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
                            <DropdownIcon/>
                        </button>
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={node => this.node = node}>
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <Link to={"/channel/" + this.state.id} className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={this.hideMenu}>
                                    <ProfileIcon className="mr-2 fill-current"/>
                                    Your profile
                                </Link>
                                <a href="/auth/logout" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                    <SignOutIcon className="mr-2 fill-current"/>
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
