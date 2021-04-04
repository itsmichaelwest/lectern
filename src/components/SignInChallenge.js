import React from 'react'
import Design from '../Design'
import MSFTSignInButton from '../vectors/msft-sign-in.svg'

export default function SignInChallenge(props) {
    function onClose(e) {
        props.onClose && props.onClose(e);
    }

    function loginToADFS(e) {
        e.preventDefault()
        window.location = '/auth/microsoft'
    }

    if (!props.show) {
        return null
    }

    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 z-50 items-center flex sm:p-4">
            <div className="absolute bottom-0 sm:relative bg-white shadow-2xl sm:max-w-xl sm:w-max max-h-max p-8 sm:rounded-xl mx-auto">
                <button className="absolute top-4 right-4 w-8 h-8" onClick={e => {onClose(e);}}>
                    <svg className="w-5 h-5 ml-1.5"  viewBox="0 0 20 20" >
                        <path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569L4.14645 4.14645L4.08859 4.21569Z" fill="#374151"/>
                    </svg>
                </button>
                <div className="text-center">
                    <h4 className="font-bold font-header text-2xl mt-2">
                        Join the discussion
                    </h4>
                    <p className="mt-4 mb-5 leading-relaxed">
                        Sign in to Lectern to post a comment. It's quick and easy to do with your Microsoft 365 account.
                    </p>
                    <button className={Design.Button + " mb-2"} onClick={loginToADFS.bind(this)}>
                        <img src={MSFTSignInButton} alt='Sign in with Microsoft' />
                    </button>
                </div>
            </div>
        </div>
    )
}