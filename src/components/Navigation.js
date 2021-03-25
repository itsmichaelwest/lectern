import React from 'react'
import BetaDisclaimer from './atoms/navigation/BetaDisclaimer'
import { Link } from 'react-router-dom'
import Design from '../Design'
import Logo from '../vectors/logo.svg'
import AccountButton from './atoms/navigation/AccountButton'

export default function Navigation() {
    return (
        <>
        <BetaDisclaimer/>
        <header className="sticky top-0 bg-white bg-opacity-90 mb-8 shadow-sm z-10" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:space-x-10">
                    <div className="flex-initial justify-start">
                        <Link to="/" className="group text-base font-bold">
                            <img className="inline-block mr-2" src={Logo} alt="Lectern icon" />
                            Lectern
                        </Link>
                    </div>
                    <div className="flex align-middle">
                        <Link className={"flex-1 mr-2 " + Design.Button} to="/upload">
                            <span className="my-0.5">
                                <svg className="block" width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1.00122C11.2761 1.00122 11.5 0.777363 11.5 0.501221C11.5 0.255761 11.3231 0.0516133 11.0899 0.00927734L11 0.0012207H0C-0.276142 0.0012207 -0.5 0.225078 -0.5 0.501221C-0.5 0.746681 -0.323125 0.95083 -0.0898757 0.993166L0 1.00122H11ZM5.50014 15.999C5.7456 15.999 5.9497 15.822 5.99197 15.5887L6 15.4989L5.996 3.70501L9.64141 7.35334C9.81482 7.52707 10.0842 7.5466 10.2792 7.41179L10.3485 7.354C10.5222 7.18059 10.5418 6.91118 10.407 6.71619L10.3492 6.64689L5.85745 2.14689C5.78495 2.07426 5.69568 2.02858 5.60207 2.00986L5.49608 2.00012C5.33511 2.00012 5.19192 2.07624 5.10051 2.19444L0.64386 6.64631C0.448459 6.84143 0.448234 7.15802 0.643357 7.35342C0.8168 7.52711 1.08621 7.54658 1.28117 7.41173L1.35046 7.35392L4.996 3.71301L5 15.4992C5.00008 15.7753 5.224 15.999 5.50014 15.999Z" fill="#374151"/>
                                </svg>
                            </span>
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