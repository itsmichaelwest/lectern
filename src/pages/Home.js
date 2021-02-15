import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'

export default class Home extends Component {
  render () {
    return (
      <div>
        <div class="flex flex-row">
          <div className="flex-initial">
            <Sidebar/>
          </div>
          <div>
             <h3 className="text-2xl font-bold mb-2">Home</h3>
            <Link className="text-yellow-600 hover:text-yellow-900" to='/profile'>Your profile (should only work if logged)</Link>
          </div>
        </div>
      </div>
    )
  }
}
