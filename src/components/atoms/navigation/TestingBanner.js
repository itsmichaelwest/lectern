import React from 'react'
import { ButtonPrimary } from '../../../Design'

// Banner to inform users they are testing the application and solicit feedback
export default function TestingBanner() {
    return (
        <div className="bg-primary-100 dark:bg-gray-900 dark:text-gray-100">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-sm py-3">
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-10 md:items-center">
                    <div>
                        <span className="font-bold">Thanks for testing Lectern!</span>&nbsp;Your feedback is appreciated. Please consider filling out the anonymous feedback form.
                    </div>
                    <a className={ButtonPrimary + " sm:flex-shrink-0"} href="https://forms.office.com/r/dTwt11mxn7">
                        Send feedback
                    </a>
                </div>
            </div>
        </div>
    )
}
