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
            menuSelected: false,
            displayNone: true
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
        if (!this.state.menuSelected) {
            this.setVisible(true)
            setTimeout(() => this.setState({
                menuSelected: true
            }), 1);
        } else {
            this.setState({
                menuSelected: false
            })
            setTimeout(() => this.setVisible(false), 650);
        }
    }

    hideMenu = () => {
        this.setState({
            menuSelected: false
        })
    }

    setVisible(state) {
        if (state === true) {
            this.setState({
                displayNone: false
            })
        } else if (state === false) {
            this.setState({
                displayNone: true
            })
        }
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
            let classes
            let hiddenClasses

            this.state.menuSelected
            ?
            classes = 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all transform'
            :
            classes = 'origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all transform scale-90 opacity-0'

            this.state.displayNone
            ?
            hiddenClasses = ' hidden'
            :
            hiddenClasses = ' '

            return (
                <div className="relative inline-block text-left flex-initial" ref={node => this.node = node}>
                    <div>
                        <button type="button" className={Design.Button} id="options-menu" aria-haspopup="true" aria-expanded="true" ref={node => this.node = node} onClick={this.toggleMenu}>
                            {this.state.displayName}
                            <svg className={`-mr-1 ml-2 h-5 w-5 transform transition-all ${this.state.menuSelected ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className={classes + hiddenClasses} ref={node => this.node = node}>
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={this.hideMenu}>Your profile</Link>
                            <a href="/auth/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign out</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
