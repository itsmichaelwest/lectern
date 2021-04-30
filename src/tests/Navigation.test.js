import { render, screen } from '@testing-library/react'
import React from 'react'
// We need Router present because there are <Link/> elements in this component.
import { BrowserRouter } from 'react-router-dom'

import Navigation from '../components/Navigation'

import '@testing-library/jest-dom/extend-expect'

test('Renders navigation', () => {
    render(
        <BrowserRouter>
            <Navigation/>
        </BrowserRouter>
    )

    expect(screen.getByTestId('home-name').textContent).toBe('Lectern')
})