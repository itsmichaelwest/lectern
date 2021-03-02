import React, { Component } from 'react'
import axios from 'axios'

import config from '../../config'

import Design from '../../designSystem'
import Thumbnail from '../../components/atoms/video/Thumbnail'

export default class Channel extends Component {
    constructor (props) {
        super(props)

        this.state = {
            channelId: 'Unauthenticated',
            channelName: 'Testing Channel',
            channelDescription: 'This is a test my friend',
            channelSubscribers: 1234567890
        }
    }

    componentDidMount () {
        const params = this.props.match.params
        
        this.setState({
            channelId: params.channelId
        })
        
        console.log(`**(Channel) Loading video details from the server...`)

        axios
        .get(config.apiUrl + '/api/v1/channel/' + params.channelId)
        .then(response => {
            console.log(`**(Channel) User is logged...`)
            this.setState({
                channelId: params.channelId,
                channelName: 'Logged In Channel',
                channelDescription: 'Logged in description'
            })
        })
        .catch(err => {
            console.log(
                `**(Channel) User is not logged.`
            )
        })
    }

    render () {
        const { channelName, channelDescription, channelSubscribers } = this.state

        return (
            <div>
                <div className="bg-green-600 rounded">
                    <div className="flex flex-row items-center relative p-8">
                        <div className="flex flex-row items-center flex-auto">
                            <div className="flex-initial rounded-full bg-white h-32 w-32 shadow-lg mr-8">
                                {/* put an image here ok */}
                            </div>
                            <div className="flex-auto text-white">
                                <h1 className="font-bold text-2xl">{channelName}</h1>
                                <p>{channelDescription}</p>
                            </div>
                        </div>
                        <div className="float-right flex-initial flex flex-row items-center">
                            <div className="mr-4 text-white">
                                {channelSubscribers}
                            </div>
                            <button className={Design.button}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <Thumbnail title="Test" description="Test"/>
                    </div>
                </div>
            </div>
        )
    }
}
