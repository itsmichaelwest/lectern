import React from 'react'

export default function Dialog(props) {
    function onPrimary(e) {
        props.onPrimary(e);
    }

    function onClose(e) {
        props.onClose && props.onClose(e);
    }

    if (!props.show) {
        return null
    }
    
    return (
        <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 z-50 items-center flex sm:p-4">
            <div className="absolute bottom-0 sm:relative bg-white shadow-2xl sm:max-w-xl sm:w-max max-h-max p-8 sm:rounded-xl mx-auto">
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