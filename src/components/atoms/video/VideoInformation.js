import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import config from '../../../config'
import Design from '../../../Design'
import Dialog from '../../Dialog'

export default function Video(props) {
    let history = useHistory()

    function formatDate(date) {
        const d = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return (
            `${d.toLocaleDateString('en-US', options)}`
        )
    }

    function downloadVideo() {
        axios
        .get(`${config.apiUrl}/api/v1/video/${props.videoId}/download`)
        .then(res => {
            console.log(res)
        })
    }

    function deleteVideo() {
        axios
        .delete(`${config.apiUrl}/api/v1/video/${props.videoId}`)
        .then(() => {
            console.log(history)
            history.goBack()
        })
    }

    return (
        <div>
            <h1 className="text-xl font-bold font-header break-words" style={{ overflowWrap: 'word' }}>{props.title}</h1>
            <p className="text-gray-600 mt-4 break-words" style={{ overflowWrap: 'word' }}>{props.description}</p>
            <div className="flex justify-between items-center my-8">
                <div>
                    <p>{props.views} views</p>
                    <p>{formatDate(props.date)}</p>
                </div>
                <div className="flex align-middle">
                    {
                        props.isCreator &&
                        <button className={Design.ButtonDestructive + " mr-2"} onClick={deleteVideo}>
                            <svg className="w-5 h-5" viewBox="0 0 16 20">
                                <path d="M9.5 4C9.5 3.17157 8.82843 2.5 8 2.5C7.17157 2.5 6.5 3.17157 6.5 4H5.5C5.5 2.61929 6.61929 1.5 8 1.5C9.38071 1.5 10.5 2.61929 10.5 4H15C15.2761 4 15.5 4.22386 15.5 4.5C15.5 4.77614 15.2761 5 15 5H14.446L13.1499 16.2292C13.0335 17.2384 12.179 18 11.1631 18H4.83688C3.821 18 2.9665 17.2384 2.85006 16.2292L1.553 5H1C0.75454 5 0.550392 4.82312 0.508056 4.58988L0.5 4.5C0.5 4.22386 0.723858 4 1 4H9.5ZM13.438 5H2.561L3.84347 16.1146C3.90169 16.6192 4.32894 17 4.83688 17H11.1631C11.6711 17 12.0983 16.6192 12.1565 16.1146L13.438 5ZM6.5 7.5C6.74546 7.5 6.94961 7.65477 6.99194 7.85886L7 7.9375V14.0625C7 14.3041 6.77614 14.5 6.5 14.5C6.25454 14.5 6.05039 14.3452 6.00806 14.1411L6 14.0625V7.9375C6 7.69588 6.22386 7.5 6.5 7.5ZM9.5 7.5C9.74546 7.5 9.94961 7.65477 9.99194 7.85886L10 7.9375V14.0625C10 14.3041 9.77614 14.5 9.5 14.5C9.25454 14.5 9.05039 14.3452 9.00806 14.1411L9 14.0625V7.9375C9 7.69588 9.22386 7.5 9.5 7.5Z" fill="#ffffff"/>
                            </svg>
                        </button>
                    }
                    <button className={Design.Button + " mr-2"} onClick={downloadVideo}>
                        <svg className="w-5 h-5" viewBox="0 0 20 20">
                            <path d="M15.5 16.9989C15.7761 16.9989 16 17.2227 16 17.4989C16 17.7443 15.8231 17.9485 15.5899 17.9908L15.5 17.9989H4.5C4.22386 17.9989 4 17.775 4 17.4989C4 17.2534 4.17688 17.0493 4.41012 17.0069L4.5 16.9989H15.5ZM10.0001 2.0011C10.2456 2.0011 10.4497 2.1781 10.492 2.41137L10.5 2.50124L10.496 14.2951L14.1414 10.6468C14.3148 10.473 14.5842 10.4535 14.7792 10.5883L14.8485 10.6461C15.0222 10.8195 15.0418 11.0889 14.907 11.2839L14.8492 11.3532L10.3574 15.8532C10.285 15.9259 10.1957 15.9715 10.1021 15.9902L9.99608 16C9.83511 16 9.69192 15.9239 9.60051 15.8057L5.14386 11.3538C4.94846 11.1587 4.94823 10.8421 5.14336 10.6467C5.3168 10.473 5.58621 10.4535 5.78117 10.5884L5.85046 10.6462L9.496 14.2871L9.5 2.50095C9.50008 2.22481 9.724 2.0011 10.0001 2.0011Z" fill="#212121"/>
                        </svg>
                    </button>
                    <button className={Design.Button}>
                        <svg className="w-5 h-5" viewBox="0 0 20 20">
                            <path d="M9.10433 2.89894C9.47114 2.15569 10.531 2.1557 10.8978 2.89894L12.8282 6.81044L17.1448 7.43768C17.9651 7.55686 18.2926 8.56484 17.699 9.14337L14.5755 12.188L15.3129 16.4872C15.453 17.3041 14.5956 17.9271 13.8619 17.5414L10.0011 15.5116L6.14018 17.5414C5.40655 17.9271 4.54913 17.3041 4.68924 16.4872L5.4266 12.188L2.30308 9.14337C1.70956 8.56483 2.03708 7.55686 2.8573 7.43768L7.17389 6.81044L9.10433 2.89894ZM10.0011 3.34151L8.07062 7.253C7.92496 7.54815 7.6434 7.75272 7.31769 7.80005L3.00109 8.42728L6.12461 11.472C6.3603 11.7017 6.46784 12.0327 6.41221 12.3571L5.67484 16.6562L9.53572 14.6265C9.82705 14.4733 10.1751 14.4733 10.4664 14.6265L14.3273 16.6562L13.5899 12.3571C13.5343 12.0327 13.6418 11.7017 13.8775 11.472L17.001 8.42728L12.6844 7.80005C12.3587 7.75272 12.0772 7.54815 11.9315 7.25301L10.0011 3.34151Z" fill="#212121"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Link className="flex flex-row items-center font-bold" to={'/channel/' + props.id}>
                    <img className="flex-initial rounded-full bg-primary shadow h-8 w-8 mr-2" src={`data:image/jpeg;base64,${props.avatar}`} />
                    {props.channelName}
                </Link>
            </div>
        </div>
    )
}
