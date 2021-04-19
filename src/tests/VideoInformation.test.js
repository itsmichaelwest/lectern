import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import VideoInformation from '../components/atoms/video/VideoInformation'

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

it('Renders video data', async () => {
    const fakeVideo = [
        {
            videoId: '00000000-0000-0000-0000-000000000000',
            streamUrl: 'https://cs394lecternvideos.blob.core.windows.net/videos/1ae745e2-51c9-4ae1-ae91-01763c749133',
            privacy: 0,
            author: '00000000-0000-0000-0000-000000000000',
            authorDisplayName: 'Joe Bloggs',
            uploaded: '2021-01-01T00:00:00.000Z',
            title: 'Test Video',
            description: 'Test Video',
            length: null,
            views: 100,
            thumbnail: null
        }
    ]
    jest.spyOn(global, 'fetch').mockImplementation(() => {
        Promise.resolve({
            json: () => Promise.resolve(fakeVideo)
        })
    })

    await act(async () => {
        render(
            <BrowserRouter>
                <VideoInformation
                    videoId='00000000-0000-0000-0000-000000000000'/>
            </BrowserRouter>
            , container)
    })
})