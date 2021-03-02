import React from 'react'
import Design from '../designSystem'

export default class Dialog extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    }

    destroyUser = e => {
        this.props.destroyUser(e);
    }

    render() {
        if (!this.props.show) {
            return null
        }
        return (
            <div className="absolute inset-0 w-screen h-screen bg-black bg-opacity-60 z-20 items-center flex p-4">
                <div className="bg-white shadow-2xl max-w-xl w-max max-h-max p-8 rounded-xl mx-auto">
                    <div>{this.props.children}</div>
                    <div className="mt-4 float-right flex">
                        <button className="ml-2 inline-block rounded-md border border-red-500 shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-gray-100 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500" onClick={e => {this.destroyUser(e);}}>
                            Yes
                        </button>
                        <button className={Design.pButton + " ml-2"} onClick={e => {this.onClose(e);}}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}