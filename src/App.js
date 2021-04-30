import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Video from './pages/Video'
import Channel from './pages/Channel'
import Upload from './pages/Upload'
import Search from './pages/Search'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ParticipationAgreement from './pages/ParticipationAgreement'
import CommunityStandards from './pages/CommunityStandards'
import APIDocsHome from './components/api-docs/APIHome'
import APIDocs from './pages/APIDocs'

// Core React Router component and website structure.
export default class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <ScrollToTop/>
                <Navigation/>
                <div className="container max-w-7xl mx-auto sm:px-6 text-sm">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/video/:videoId" component={Video} />
                        <Route path="/channel/:channelId" component={Channel} />
                        <Route path="/upload" component={Upload} />
                        <Route path="/search" component={Search} />
                        <Route path="/privacy" component={PrivacyPolicy} />
                        <Route path="/participation" component={ParticipationAgreement} />
                        <Route path="/community-standards" component={CommunityStandards} />
                        <Route exact path="/api" component={APIDocsHome} />
                        <Route path="/api/:apiType" component={APIDocs} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer/>
            </BrowserRouter>
        )
    }
}