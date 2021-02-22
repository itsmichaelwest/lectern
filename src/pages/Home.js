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
        <div className="flex flex-row">
          <div className="flex-initial">
            <Sidebar/>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Home</h3>
            <Link className="text-yellow-600 hover:text-yellow-900" to='/profile'>Your profile (should only work if logged)</Link>
            <Link className="text-yellow-600 hover:text-yellow-900" to='/upload'>Upload page (should only work if logged)</Link>
          </div>
        </div>
      </div>
      </>
    )
  }
}
