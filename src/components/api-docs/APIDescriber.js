import React from 'react'

export default function APIDescriber(props) {
    return (
        <div className="my-8">
            <h3 className="font-mono text-lg">
                <span className="text-primary">{props.method}</span> {props.endpoint}
            </h3>
            <p>
                {props.children}
            </p>
        </div>
    )
}