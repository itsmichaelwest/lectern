import React, { useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import { Link } from 'react-router-dom'
import Design from '../../../Design'
import Dialog from '../../Dialog'

export default function Video(props) {
    return (
        <div>
            <h1 className="text-xl font-bold">{props.title}</h1>
            <p className="text-gray-600 mt-4">{props.description}</p>
            <div className="flex justify-between items-center my-8">
                <div>
                    <p>{props.views} views</p>
                    <p>{props.date}</p>
                </div>
                <div>
                    {
                        props.isCreator &&
                        <button className={Design.ButtonDestructive + " mr-2"}>
                            Delete
                        </button>
                    }
                    <button className={Design.Button}>
                        {props.faves}
                        Favorite
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Link className="flex flex-row items-center font-bold" to={'/channel/' + props.id}>
                    <div className="flex-initial rounded-full bg-primary h-8 w-8 mr-2">
                        {/* put an image here ok */}
                    </div>
                    {props.channelName}
                </Link>
            </div>
        </div>
    )
}
