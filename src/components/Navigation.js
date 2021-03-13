import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Design from '../designSystem'
import AccountButton from './atoms/navigation/AccountButton'

export default class Navigation extends Component {
    render() {
        return (
            <header className="sticky top-0 bg-white bg-opacity-90 mb-8 shadow-sm z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4 md:space-x-10">
                        <div className="flex-initial justify-start">
                            <Link to="/" className="group text-base font-medium">
                                Lectern <span className="text-primary-600 group-hover:text-primary-900 font-bold">β</span>
                            </Link>
                        </div>
                        <div className="flex align-middle">
                            <Link className={"flex-1 mr-2 " + Design.pButton} to="/upload">Upload</Link>
                            <AccountButton/>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}