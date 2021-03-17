import React, { Component } from 'react'
import axios from 'axios'

import config from '../../config'

import Design from '../../designSystem'
import Thumbnail from '../../components/atoms/video/Thumbnail'
import { Helmet } from 'react-helmet'

export default class Channel extends Component {
    constructor (props) {
        super(props)

        this.state = {
            channelId: 'Unauthenticated',
            channelName: 'Channel Test',
            channelSubscribers: 200
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
            })
        })
        .catch(err => {
            console.log(
                `**(Channel) User is not logged.`
            )
        })
    }

    render () {
        const { channelName, channelSubscribers } = this.state

        return (
            <>
            <Helmet>
                <title>Channel | Lectern</title>
            </Helmet>
            <div>
                <div className="bg-primary-900 rounded-xl">
                    <div className="flex flex-row items-center relative p-8">
                        <div className="flex flex-row items-center flex-auto">
                            <div className="flex-initial flex-shrink-0 rounded-full bg-white h-32 w-32 shadow-lg mr-8">
                                {/* put an image here ok */}
                            </div>
                            <div className="flex-auto text-white">
                                <h1 className="font-bold text-2xl">{channelName}</h1>
                            </div>
                        </div>
                        <div className="float-right flex-initial flex flex-row items-center">
                            <div className="mr-4 text-white">
                                {channelSubscribers} subscribers
                            </div>
                            <button className={Design.pButton}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Thumbnail id="24" length="06:05" title="About CS381" description="First lecture of CS381 module"/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
