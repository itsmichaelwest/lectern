import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Design from '../designSystem'
import AccountButton from './atoms/navigation/AccountButton'

export default class Navigation extends Component {
    render() {
        return (
            <>
            <div className="bg-primary-200">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-sm py-3 font-semibold">
                    <div className="flex justify-between space-x-10 items-center">
                        <div className="flex-auto">
                            <div className="flex flex-row items-center">
                                <span className="bg-primary text-white px-2 py-1 rounded mr-2 flex-grow-0">
                                    ALPHA
                                </span>
                                <div>
                                    This service is in alpha. Some functionality may be broken or missing.
                                </div>
                            </div>
                        </div>
                        <div>
                            <a className="text-right hover:text-gray-600" href="mailto:maw86@aber.ac.uk?subject=Lectern%20Feedback">
                                Send feedback
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <header className="sticky top-0 bg-white bg-opacity-90 mb-8 shadow-sm z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4 md:space-x-10">
                        <div className="flex-initial justify-start">
                            <Link to="/" className="group text-base font-bold">
                                <svg className="inline-block mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.0001 9.33329H8.00008C8.00008 9.33329 4.66675 13.3333 4.66675 16C4.66675 18.6666 12.0001 23.3333 12.0001 23.3333C12.0001 23.3333 19.3334 18.6666 19.3334 16C19.3334 13.3333 16.0001 9.33329 16.0001 9.33329Z" fill="#31373D"/>
                                    <path d="M13.0933 0.853328C12.4926 0.383994 11.5086 0.383994 10.9079 0.853328L1.09259 8.51733C0.491923 8.98666 0.491923 9.75466 1.09259 10.224L10.9073 17.8873C11.5086 18.3567 12.4919 18.3567 13.0926 17.8873L22.9073 10.224C23.5086 9.75466 23.5086 8.98666 22.9073 8.51733L13.0933 0.853328Z" fill="#292F33"/>
                                    <path d="M13.0933 0.853328C12.4926 0.383994 11.5086 0.383994 10.9079 0.853328L1.09259 8.51733C0.491923 8.98666 0.491923 9.75466 1.09259 10.224L10.9073 17.8873C11.5079 18.3567 12.4919 18.3567 13.0926 17.8873L22.9079 10.224C23.5086 9.75466 23.5086 8.98666 22.9079 8.51733L13.0933 0.853328Z" fill="#394146"/>
                                    <path d="M5.33333 16.6667C5.33333 16.6667 4 18 4 18.6667V22.6667C4 22.6667 4 24 5.33333 24C6.66667 24 6.66667 22.6667 6.66667 22.6667V18.6667C6.66667 18 5.33333 16.6667 5.33333 16.6667Z" fill="#FCAB40"/>
                                    <path d="M5.33325 19.3333C6.43782 19.3333 7.33325 18.4379 7.33325 17.3333C7.33325 16.2288 6.43782 15.3333 5.33325 15.3333C4.22868 15.3333 3.33325 16.2288 3.33325 17.3333C3.33325 18.4379 4.22868 19.3333 5.33325 19.3333Z" fill="#FDD888"/>
                                    <path d="M5.33406 18C4.96606 18 4.66739 17.702 4.66739 17.3333V14.6947C4.63939 14.272 4.79205 13.3373 5.54539 12.772L11.5601 7.49867C11.8374 7.25534 12.2587 7.28334 12.5007 7.56067C12.7434 7.83734 12.7154 8.25867 12.4387 8.50134L6.38539 13.8067C5.98272 14.1107 6.00006 14.6547 6.00006 14.66L6.00139 17.3333C6.00139 17.702 5.70272 18 5.33406 18V18Z" fill="#FCAB40"/>
                                    <path d="M12 10.6667C13.1046 10.6667 14 9.77124 14 8.66667C14 7.5621 13.1046 6.66667 12 6.66667C10.8954 6.66667 10 7.5621 10 8.66667C10 9.77124 10.8954 10.6667 12 10.6667Z" fill="#31373D"/>
                                </svg>
                                Lectern
                            </Link>
                        </div>
                        <div className="flex align-middle">
                            <Link className={"flex-1 mr-2 " + Design.pButton} to="/upload">Upload</Link>
                            <AccountButton/>
                        </div>
                    </div>
                </div>
            </header>
            </>
        )
    }
}