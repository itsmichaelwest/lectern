import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'

// We need Router present because there are <Link/> elements in this component.
import { BrowserRouter } from 'react-router-dom'

import Thumbnail from '../components/atoms/video/Thumbnail'

let container = null

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it('Renders <Thumbnail/> component' , async () => {
    await act(async () => {
        render (
            <BrowserRouter>
                <Thumbnail 
                    id="00000000-0000-0000-0000-000000000000"
                    title="Test Video"
                    description="Joe Bloggs"
                    thumb={null}
                />
            </BrowserRouter>
        , container)
    })
})