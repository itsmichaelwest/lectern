import React from 'react'
import { Helmet } from 'react-helmet'
import Undraw404 from '../vectors/undraw-404.svg'
import { Link } from 'react-router-dom'
import Design from '../Design'

export default function NotFound() {
    return (
        <>
        <Helmet>
            <title>Page not found | Lectern</title>
        </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full my-48 px-4 md:px-8 lg:px-16">
            <div className="mx-8 sm:mx-24 md:mx-0">
                <img src={Undraw404} alt="" />
            </div>
            <div className="my-auto">
                <h1 className="text-2xl dark:text-white font-bold mb-2">Well this is embarrassing</h1>
                <p className="mb-2 dark:text-white">It looks like you hit a page that doesn't exist.</p>
                <Link className={Design.URL} to='/'>Go back to the homepage</Link>
                <p className="text-xs mt-2 text-gray-400">Contacting a support person? Let them know that this was the page you were trying to visit: <strong>{window.location.href}</strong></p>
                <p className="text-xs mt-2 text-gray-400">HTTP 404</p>
            </div>
        </div>
        </>
    )
}
