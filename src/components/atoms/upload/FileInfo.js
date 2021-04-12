import React from 'react'
import Design from '../../../Design'
import Filesize from 'filesize'

import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg'

export default function FileInfo(props) {
    return (
        <div className="relative rounded-xl border border-gray-300 w-full p-4 overflow-hidden">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <span className="inline-block align-middle font-semibold leading-relaxed">
                        {props.name}
                    </span>
                    <span className="text-xs text-gray-600">
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
            <span className="absolute inset-0 bg-primary-100 transition-all" style={{ zIndex: '-1', width: `${((100 / props.size) * props.loadedBytes)}%` }} />
            <span className="absolute inset-0 bg-gray-100" style={{ zIndex: '-2' }} />
            </>
            }
        </div>
    )
}