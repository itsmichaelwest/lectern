import React from 'react'

// Basic Dialog component with two buttons.
export default function Dialog(props) {
    // Primary action
    function onPrimary(e) {
        props.onPrimary(e);
    }

    // Secondary/dismissive action
    function onClose(e) {
        props.onClose && props.onClose(e);
    }

    // Do not show the dialog if the show variable is false
    if (!props.show) {
        return null
    }
    
    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 dark:bg-opacity-80 z-50 items-center flex p-4">
            <div className="relative bg-white dark:bg-gray-800 dark:text-white shadow-2xl max-w-max sm:max-w-xl max-h-max p-8 rounded-xl mx-auto">
                <div>
                    {props.children}
                </div>
                <div className="mt-4 float-right flex">
                    <button className={props.primaryStyle} onClick={e => {onPrimary(e);}}>
                        {props.primary}
                    </button>
                    <button className={props.secondaryStyle + " ml-2"} onClick={e => {onClose(e);}}>
                        {props.secondary}
                    </button>
                </div>
            </div>
        </div>
    )
}