import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'

export default class Video extends Component {
    constructor (props) {
        super(props)

        this.state = {
            channelId: 'Unauthenticated'
        }
    }

    componentDidMount () {
        console.log(`**(Channel) Loading video details from the server...`)

        const params = this.props.match.params

        axios
        .get(config.apiUrl + '/api/v1/channel/' + params.channelId)
        .then(response => {
            console.log(`**(Video) User is logged...`)
            this.setState({
                channelId: params.channelId
            })
        })
        .catch(err => {
            console.log(
                `**(Channel) User is not logged.`
            )
        })
    }

    render () {
        const { channelId } = this.state

        return (
            <div>
                <p>Channel ID: {channelId}</p>
            </div>
        )
    }
}
