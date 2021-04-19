import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Design from '../Design'
import SearchBar from './atoms/navigation/SearchBar'
import AccountButton from './atoms/navigation/AccountButton'

import { ReactComponent as LecternLogo } from '../vectors/logo.svg'
import { ReactComponent as DismissIcon } from '../icons/dismiss.svg'
import { ReactComponent as SearchIcon} from '../icons/search.svg'
import { ReactComponent as UploadIcon } from '../icons/upload.svg'

export default function Navigation() {
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    return (
        <>
        <header className="sticky top-0 bg-white bg-opacity-70 mb-8 shadow-sm z-50" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}> 
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:space-x-10">
                    <div className="flex-initial justify-start">
                        <Link to="/" className="group text-base font-header font-bold flex">
                            <LecternLogo
                                className="mr-2"
                                alt="Lectern logo"/>
                            Lectern
                            <span className="bg-primary text-white text-xs font-mono ml-2 px-2 py-1 rounded align-baseline">
                                BETA
                            </span>
                        </Link>
                    </div>
                    <div className="flex align-middle">
                        { showMobileSearch ? 
                        <div className="absolute inset-0 px-4 sm:px-6 flex items-center w-full z-40 bg-white">
                            <SearchBar/>
                            <button className="w-8 h-8" onClick={() => setShowMobileSearch(!showMobileSearch)}>
                                <DismissIcon 
                                    className="mx-auto fill-current"
                                    alt="Close search box"/>
                            </button>
                        </div>
                        :
                        <button className={"flex-1 mr-2 " + Design.Button} onClick={() => setShowMobileSearch(!showMobileSearch)}>
                            <SearchIcon className="md:-ml-1 fill-current"/>
                            <span className="ml-2 hidden md:inline">
                                Search
                            </span>
                        </button>
                        }
                        <Link className={"flex-1 mr-2 " + Design.Button} to="/upload">
                            <UploadIcon className="md:-ml-1 fill-current"/>
                            <span className="ml-2 hidden md:inline">
                                Upload
                            </span>
                        </Link>
                        <AccountButton/>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}