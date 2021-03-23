import React from 'react'
import Design from '../../../designSystem'
import Filesize from 'filesize'

export default function FileInfo(props) {
    return (
        <div className="rounded-xl border border-gray-300 w-full p-4">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="inline-block align-middle font-semibold leading-relaxed">
                        {props.name}
                    </span>
                    <span className="text-xs text-gray-600">
                        {Filesize(props.size)}
                    </span>
                </div>

                <button type="button" onClick={props.removeFile} className={Design.Button}>Remove File</button>
            </div>
        </div>
    )
}