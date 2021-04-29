import React from 'react'
import Design from '../../../Design'
import Filesize from 'filesize'

import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'

export default function FileInfo(props) {
    return (
        <div className="relative rounded-xl border border-gray-300 dark:border-gray-800 w-full p-4 overflow-hidden">
            <div className="relative flex justify-between z-20">
                <div className="flex flex-col">
                    <span className="inline-block align-middle font-semibold dark:text-white leading-relaxed">
                        {props.name}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        { !props.isLoading 
                            ?
                            Filesize(props.size)
                            :
                            Math.round(((100 / props.size) * props.loadedBytes)) + '% uploaded'
                        }
                    </span>
                </div>

                { !props.isLoading &&
                <button type="button" onClick={props.removeFile} className={Design.ButtonDestructive}>
                    <DeleteIcon className="-ml-1 mr-2 fill-current"/>
                    Delete
                </button>
                }
            </div>

            { props.isLoading &&
            <>
            <div className="absolute inset-0 bg-primary-100 dark:bg-gray-700 transition-all z-10" style={{ width: `${((100 / props.size) * props.loadedBytes)}%` }} />
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900"/>
            </>
            }
        </div>
    )
}