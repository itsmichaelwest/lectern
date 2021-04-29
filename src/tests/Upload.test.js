import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import UploadForm from '../components/UploadForm'

test('Render and submit form', async () => {
    const handleSubmit = jest.fn()

    render(
        <UploadForm onSubmit={values => handleSubmit(values)} />
    )

    userEvent.type(screen.getByLabelText(/Title/i), 'Test Video')
    userEvent.type(screen.getByLabelText(/Description/i), 'This is a test video')
    
    userEvent.click(screen.getByRole('button', { name: /Upload/i }))

    await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
            title: 'Test Video',
            description: 'This is a test video',
            privacy: 0
        }, expect.anything())
    })
})