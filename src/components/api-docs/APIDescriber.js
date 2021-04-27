import React from 'react'

export default function APIDescriber(props) {
    return (
        <div className="my-16">
            <h3 className="font-mono dark:text-white text-lg">
                <span className="text-primary dark:text-primary-700 font-semibold">{props.method}</span> {props.endpoint}
            </h3>
            <p className="dark:text-white">
                {props.children}
            </p>
        </div>
    )
}