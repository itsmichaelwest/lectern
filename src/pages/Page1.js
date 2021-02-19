import React, { Component } from 'react'

export default class Page1 extends Component {
  render () {
    const params = this.props.match.params
    
    return (
      <div>
        <h3>Page 1</h3>
        <h5>Subtitle</h5>
        <p>{params.videoId}</p>
      </div>
    )
  }
}
