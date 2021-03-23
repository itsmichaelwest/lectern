import React, { Component } from 'react'
import Comment from '../comment/Comment'

export default class VideoComments extends Component {
    render () {
        return (
            <div>
                <div className="border rounded h-full max-h-64 lg:max-h-full overflow-y-scroll">
                    <Comment timeSecs={60} time="01:00" name="Michael West" content="Can't wait to watch those lectures on Lectern 😁" />
                    <Comment timeSecs={106} time="01:46" name="Michael West" content="FOSDEM is pretty good, I went in my first year. Sadly can't go this year but I think it's online?" />
                    <Comment timeSecs={254} time="04:14" name="Michael West" content="Yep, reason I signed up for this module was the philosophical content!" />
                </div>
            </div>
        )
    }
}