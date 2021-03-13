import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Hls from 'hls.js'
import Thumbnail from '../components/atoms/video/Thumbnail'

export default class Home extends Component {
    render () {
        return (
            <>
            <Helmet>
                <title>Lectern</title>
            </Helmet>
            <div>
                <h1 className="text-4xl font-bold mb-8">Your Feed</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Thumbnail id="24" length="03:14" title="pog" description="mr pog does a pog"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                </div>
                <h1 className="text-4xl font-bold mb-8 mt-32">Popular on Lectern</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Thumbnail id="24" length="03:14" title="pog" description="mr pog does a pog"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                    <Thumbnail id="" length="03:14" title="Test" description="Test"/>
                </div>
            </div>
            </>
        )
    }
}
