import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Sidebar from './components/sidebar/Sidebar'
import Video from './pages/Video'

export default class App extends Component {
  render () {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <Navigation/>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route path="/login" component={Login} />
            <Route path="/video/:videoId" component={Video} />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
        <Footer/>
      </div>
    )
  }
}