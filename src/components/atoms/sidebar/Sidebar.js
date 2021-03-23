import { React, Component } from 'react'
import SidebarLink from './Link'

export default class Sidebar extends Component {
    render() {
        return (
            <>
            <div>
                <SidebarLink/>
                <SidebarLink/>
                <SidebarLink/>
                <SidebarLink/>
                <SidebarLink/>
                <SidebarLink/>
                <SidebarLink/>
            </div>
            </>
        )
    }
}