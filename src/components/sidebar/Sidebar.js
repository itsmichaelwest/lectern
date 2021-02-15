import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SidebarLink from './Link'

export default class Sidebar extends Component {
    render() {
        return (
            <>
            <div className="w-64">
                <SidebarLink/>
                
            </div>
            </>
        )
    }
}