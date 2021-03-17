import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Video from './pages/Video'
import Channel from './pages/Channel'
import Upload from './pages/Upload'
import PrivacyPolicy from './pages/PrivacyPolicy'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Navigation/>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-sm">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/video/:videoId" component={Video} />
            <Route path="/channel/:channelId" component={Channel} />
            <Route path="/upload" component={Upload} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer/>
      </BrowserRouter>
    )
  }
}