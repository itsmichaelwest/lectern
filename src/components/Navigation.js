import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Design from '../Design'
import Logo from '../vectors/logo.svg'
import SearchBar from './atoms/navigation/SearchBar'
import AccountButton from './atoms/navigation/AccountButton'

export default function Navigation() {
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    return (
        <>
        <header className="sticky top-0 bg-white bg-opacity-70 mb-8 shadow-sm z-50" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}> 
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:space-x-10">
                    <div className="flex-initial justify-start">
                        <Link to="/" className="group text-base font-header font-bold flex">
                            <img className="inline-block mr-2" src={Logo} alt="Lectern icon" />
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
                                <svg className="w-5 h-5 ml-1.5"  viewBox="0 0 20 20" >
                                    <path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569L4.14645 4.14645L4.08859 4.21569Z" fill="#374151"/>
                                </svg>
                            </button>
                        </div>
                        :
                        <div className="ml-2">
                            <button className={"flex-1 mr-2 " + Design.Button} onClick={() => setShowMobileSearch(!showMobileSearch)}>
                                <svg className="block" width="16" height="20" viewBox="0 0 16 20">
                                    <path d="M6.5 3C9.53757 3 12 5.46243 12 8.5C12 9.83879 11.5217 11.0659 10.7266 12.0196L14.8536 16.1464C15.0488 16.3417 15.0488 16.6583 14.8536 16.8536C14.68 17.0271 14.4106 17.0464 14.2157 16.9114L14.1464 16.8536L10.0196 12.7266C9.06586 13.5217 7.83879 14 6.5 14C3.46243 14 1 11.5376 1 8.5C1 5.46243 3.46243 3 6.5 3ZM6.5 4C4.01472 4 2 6.01472 2 8.5C2 10.9853 4.01472 13 6.5 13C8.98528 13 11 10.9853 11 8.5C11 6.01472 8.98528 4 6.5 4Z" fill="#374151"/>
                                </svg>
                                <span className="ml-2 hidden md:inline">
                                    Search
                                </span>
                            </button>
                        </div>
                        }
                        <Link className={"flex-1 mr-2 " + Design.Button} to="/upload">
                            <svg className="block" width="16" height="20" viewBox="0 0 16 20">
                                <path d="M13 3.00122C13.2761 3.00122 13.5 2.77736 13.5 2.50122C13.5 2.25576 13.3231 2.05161 13.0899 2.00928L13 2.00122H2C1.72386 2.00122 1.5 2.22508 1.5 2.50122C1.5 2.74668 1.67688 2.95083 1.91012 2.99317L2 3.00122H13ZM7.50014 17.999C7.7456 17.999 7.9497 17.822 7.99197 17.5887L8 17.4989L7.996 5.70501L11.6414 9.35334C11.8148 9.52707 12.0842 9.5466 12.2792 9.41179L12.3485 9.354C12.5222 9.18059 12.5418 8.91118 12.407 8.71619L12.3492 8.64689L7.85745 4.14689C7.78495 4.07426 7.69568 4.02858 7.60207 4.00986L7.49608 4.00012C7.33511 4.00012 7.19192 4.07624 7.10051 4.19444L2.64386 8.64631C2.44846 8.84143 2.44823 9.15802 2.64336 9.35342C2.8168 9.52711 3.08621 9.54658 3.28117 9.41173L3.35046 9.35392L6.996 5.71301L7 17.4992C7.00008 17.7753 7.224 17.999 7.50014 17.999Z" fill="#374151"/>
                            </svg>
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