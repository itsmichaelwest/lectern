import React, { Component } from 'react'
import axios from 'axios'

import config from '../config'

export default class Video extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videoId: 'Unauthenticated'
    }
  }

  componentDidMount () {
    console.log(`**(Video) Loading video details from the server...`)

    const params = this.props.match.params

    axios
      .get(config.apiUrl + '/api/v1/video/' + params.videoId)
      .then(response => {
        console.log(`**(Video) User is logged...`)
        this.setState({
          videoId: response.data
        })
      })
      .catch(err => {
        console.log(
          `**(Video) User is not logged.`
        )
      })
  }

  render () {
    const { videoId } = this.state

    return (
      <div>
        <h3>Video</h3>
        <p>Video ID: {videoId}</p>
      </div>
    )
  }
}
