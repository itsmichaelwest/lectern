import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Sidebar from '../components/sidebar/Sidebar'

export default class Home extends Component {
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
      </div>
      </>
    )
  }
}
