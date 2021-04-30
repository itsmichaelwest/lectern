const channelInfo = require('../database/channel/channelInfo')
const channelSearch = require('../database/channel/channelSearch')

const { addUser, destroyUser } = require('../database/user/user')
const uploadVideo = require('../database/video/upload')

const sql = require('../database/sql')

// Set up fake user
beforeAll(done => {
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

// Test fetching channel data
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

    test('Fetch channel', done => {
        channelInfo.getInfo('00000000-0000-0000-0000-000000000000', res => {
            expect(res[0].channelId).toBe('00000000-0000-0000-0000-000000000000')
            done()
        })
    })

    test('Fetch channel videos', done => {
        channelInfo.getInfoVideos('00000000-0000-0000-0000-000000000000', res => {
            expect(res[0].channelId).toBe('00000000-0000-0000-0000-000000000000')
            expect(res[1][0].videoId).toBe('00000000-0000-0000-0000-000000000000')
            done()
        })
    })
})

// Test searching for a channel
describe('Search channel', () => {
    test('Search channel by name', done => {
        channelSearch('Joe Bloggs', res => {
            expect(res[0].channelId).toBe('00000000-0000-0000-0000-000000000000')
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
