import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'

// We need Router present because there are <Link/> elements in this component.
import { BrowserRouter } from 'react-router-dom'

import Comment from '../components/atoms/comment/Comment'

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

it('Renders <Comment/> component' , async () => {
    await act(async () => {
        render (
            <BrowserRouter>
                <Comment 
                    time="90"
                    name="Joe Bloggs"
                    content="Test Comment"
                />
            </BrowserRouter>
        , container)

        // Expect time to be transformed into a human readable string
        expect(screen.getByTestId('timestamp').textContent).toBe('01:30')

        expect(screen.getByTestId('name').textContent).toBe('Joe Bloggs')
        expect(screen.getByTestId('comment').textContent).toBe('Test Comment')
    })
})

it('Checks hover state works' , async () => {
    await act(async () => {
        render (
            <BrowserRouter>
                <Comment 
                    time="90"
                    name="Joe Bloggs"
                    content="Test Comment"
                />
            </BrowserRouter>
        , container)

        const mouseEnter = new MouseEvent("mouseenter", {
            bubbles: false,
            cancelable: false
        })

        fireEvent(screen.getByTestId('comment-container'), mouseEnter)

        // Expect time to be transformed into a human readable string
        expect(screen.getByTestId('buttons')).toBeTruthy()
    })
})