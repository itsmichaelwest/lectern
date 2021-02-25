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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-3">
            <Sidebar/>
          </div>
          <div className="col-span-9 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">Home</h1>
            <Link className="max-w-max text-yellow-600 hover:text-yellow-900" to='/profile'>Your profile</Link>
            <Link className="max-w-max text-yellow-600 hover:text-yellow-900" to='/upload'>Upload page</Link>
            <Link className="max-w-max text-yellow-600 hover:text-yellow-900" to='/video/123'>Video page</Link>
          </div>
        </div>
      </div>
      </>
    )
  }
}
