import { React, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Footer extends Component {
    render() {
        return (
            <>
            <footer className="absolute inset-x-0 bottom-0 bg-white mt-8">
                <div className="max-w-7xl mx-auto my-8">
                    <div className="flex">
                        <p>
                            Copyright 2021
                        </p>
                    </div>

                </div>
            </footer>
            </>
        )
    }
}