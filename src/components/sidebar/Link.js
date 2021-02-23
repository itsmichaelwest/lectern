import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SidebarLink() {
    return (
        <>
        <Link to="/video/123" className="block w-full px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer">
            Sidebar Link
        </Link>
        </>
    )
}