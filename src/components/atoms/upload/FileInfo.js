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

                <button type="button" onClick={props.removeFile} className={Design.ButtonDestructive}>
                    <svg className="inline-block mr-2 fill-current" width="16" height="20" viewBox="0 0 16 20">
                        <path d="M9.5 4C9.5 3.17157 8.82843 2.5 8 2.5C7.17157 2.5 6.5 3.17157 6.5 4H5.5C5.5 2.61929 6.61929 1.5 8 1.5C9.38071 1.5 10.5 2.61929 10.5 4H15C15.2761 4 15.5 4.22386 15.5 4.5C15.5 4.77614 15.2761 5 15 5H14.446L13.1499 16.2292C13.0335 17.2384 12.179 18 11.1631 18H4.83688C3.821 18 2.9665 17.2384 2.85006 16.2292L1.553 5H1C0.75454 5 0.550392 4.82312 0.508056 4.58988L0.5 4.5C0.5 4.22386 0.723858 4 1 4H9.5ZM13.438 5H2.561L3.84347 16.1146C3.90169 16.6192 4.32894 17 4.83688 17H11.1631C11.6711 17 12.0983 16.6192 12.1565 16.1146L13.438 5ZM6.5 7.5C6.74546 7.5 6.94961 7.65477 6.99194 7.85886L7 7.9375V14.0625C7 14.3041 6.77614 14.5 6.5 14.5C6.25454 14.5 6.05039 14.3452 6.00806 14.1411L6 14.0625V7.9375C6 7.69588 6.22386 7.5 6.5 7.5ZM9.5 7.5C9.74546 7.5 9.94961 7.65477 9.99194 7.85886L10 7.9375V14.0625C10 14.3041 9.77614 14.5 9.5 14.5C9.25454 14.5 9.05039 14.3452 9.00806 14.1411L9 14.0625V7.9375C9 7.69588 9.22386 7.5 9.5 7.5Z" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    )
}