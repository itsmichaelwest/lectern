const getVideo = require('../database/video/fetch')
const uploadVideo = require('../database/video/upload')
const deleteVideo = require('../database/video/videoDelete')
const setViews = require('../database/video/setViews')
const searchVideo = require('../database/video/videoSearch')

const { addUser, destroyUser } = require('../database/user/user')

const sql = require('../database/sql')

// Set up fake user and make sure fake videos have been deleted
beforeAll(done => {
    deleteVideo('00000000-0000-0000-0000-000000000000', () => {})

    const profile = {
        oid: '00000000-0000-0000-0000-000000000000',
        _json: {
            email: 'example@example.com'
        }
    }

    addUser (
        profile,
        'Joe Bloggs',
        null,
        () => {
            done()
        }
    )
})

// Test fetching videos
describe('Test fetch', () => {
    beforeAll(done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'Test Video',
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            () => { done() }
        )
    })

    test('Fetch video that exists, returns video object', done => {
        getVideo.getVideo('00000000-0000-0000-0000-000000000000', res => {
            expect(res.videoId).toBe('00000000-0000-0000-0000-000000000000')
            done()
        })
    })

    test('Fetch video that does not exists, returns false', done => {
        getVideo.getVideo('00000000-1111-1111-1111-000000000000', res => {
            expect(res.videoId).toBeFalsy()
            done()
        })
    })
    
    afterAll(done => {
        deleteVideo('00000000-0000-0000-0000-000000000000', () => { done() })
    })
})

// Test inserting a valid video and then two invalid videos
describe('Test upload functions', () => {
    test('Regular upload, returns true', done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'Test Video',
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            res => {
                expect(res).toBe(true)
                done()
            }
        )
    })

    test('Title is longer than 1000 chars, returns false', done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'x'.repeat(1001),
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            res => {
                expect(res).toBe(false)
                done()
            }
        )
    })

    test('Description is longer than 2000 chars, returns false', done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'x'.repeat(2001),
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            res => {
                expect(res).toBe(false)
                done()
            }
        )
    })

    afterAll(done => {
        deleteVideo('00000000-0000-0000-0000-000000000000', () => { done() })
    })
})

// Test incrementing and decrementing views
describe('Test view increments', () => {
    beforeAll(done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'Test Video',
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            () => { done() }
        )
    })

    test('Increment view', done => {
        setViews.addView('00000000-0000-0000-0000-000000000000', () => {
            getVideo.getVideo('00000000-0000-0000-0000-000000000000', res => {
                expect(res.views).toBe(1)
                done()
            })
        })
    })

    test('Decrement view', done => {
        setViews.removeView('00000000-0000-0000-0000-000000000000', () => {
            getVideo.getVideo('00000000-0000-0000-0000-000000000000', res => {
                expect(res.views).toBe(0)
                done()
            })
        })
    })

    afterAll(done => {
        deleteVideo('00000000-0000-0000-0000-000000000000', () => { done() })
    })
})

// Test searching for video by title and description.
describe('Test search', () => {
    // Additional 000 before title and description help prevent large arrays
    // being returned.
    beforeAll(done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            '000Test Video',
            '000This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            () => { done() }
        )
    })

    test('Search title', done => {
        searchVideo.searchTitleDescription('000Test', res => {
            expect(res[0].title).toBe('000Test Video')
            done()
        })
    })

    test('Search description', done => {
        searchVideo.searchTitleDescription('000This', res => {
            expect(res[0].description).toBe('000This video is being uploaded as a test of the Video API.')
            done()
        })
    })

    afterAll(done => {
        deleteVideo('00000000-0000-0000-0000-000000000000', () => { done() })
    })
})

// Test deleting a video
describe('Test delete function', () => {
    beforeAll(done => {
        uploadVideo(
            '00000000-0000-0000-0000-000000000000',
            'Test Video',
            'This video is being uploaded as a test of the Video API.',
            0,
            'https://example.com',
            '00000000-0000-0000-0000-000000000000',
            100,
            'https://example.com',
            () => { done() }
        )
    })

    test('Delete video', done => {
        deleteVideo('00000000-0000-0000-0000-000000000000', res => {
            expect(res).toBe(true)
            done()
        })
    })
})

// Remove fake user
afterAll(done => {
    destroyUser('00000000-0000-0000-0000-000000000000', () => {
        // We need to close the database connection or Jest will hang!
        sql.close()
        done()
    })
})
