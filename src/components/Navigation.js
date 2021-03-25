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
                            Upload
                        </Link>
                        <AccountButton/>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}