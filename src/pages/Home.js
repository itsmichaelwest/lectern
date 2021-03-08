import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Hls from 'hls.js'

export default class Home extends Component {
  componentDidMount() {
    var video = document.getElementById('video')
    var videoSrc = 'https://aucs39440mediatest-ukso1.streaming.media.azure.net/89710c1a-8226-43cb-a842-c4a29abc0b5a/2BDGpizugSe_mrNe.ism/manifest(format=m3u8-aapl)'

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
    }

  }

  render () {
    return (
      <>
      <Helmet>
        <title>Home | CS394</title>
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold mb-2">Feed</h1>
        <div className="flex flex-col">
          <Link className="max-w-max text-primary-600 hover:text-primary-900" to='/profile'>Your profile</Link>
          <Link className="max-w-max text-primary-600 hover:text-primary-900" to='/upload'>Upload page</Link>
          <Link className="max-w-max text-primary-600 hover:text-primary-900" to='/video/123'>Video page</Link>
        </div>
        <div>
          <video id="video" autoPlay controls></video>
        </div>
      </div>
      </>
    )
  }
}
