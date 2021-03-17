import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Thumbnail from '../components/atoms/video/Thumbnail'
export default class Home extends Component {
    render () {
        return (
            <>
            <Helmet>
                <title>Lectern</title>
            </Helmet>
            <div>
                <h1 className="text-4xl font-bold mb-8">Popular on Lectern</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Thumbnail id="2" length="06:05" title="About CS381" description="First lecture of CS381 module"/>
                    <Thumbnail id="3" length="03:14" title="Penguins" description="Understanding the daily routine of penguins"/>
                    <Thumbnail id="4" length="16:53" title="The Science of Space Suits" description="How do NASA astronauts go on spacewalks?"/>
                    <Thumbnail id="5" length="03:14" title="Heavy Rocks" description="Let's learn about the inside of a mountain."/>
                    <Thumbnail id="6" length="03:14" title="Seattle Space Needle" description="An iconic landmark. Take a virtual trip up to the top."/>
                    <Thumbnail id="" length="00:00" title="Broken Link Test" description="I should take you to a 404"/>
                </div>
            </div>
            </>
        )
    }
}
