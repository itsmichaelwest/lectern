const addComment = require('../database/comments/addComment')
const deleteComment = require('../database/comments/deleteComment')
const fetchComment = require('../database/comments/fetchComment')
const reportComment = require('../database/comments/reportComment')

const { addUser, destroyUser } = require('../database/user/user')
const uploadVideo = require('../database/video/upload')

const sql = require('../database/sql')

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
            () => {}
        )

        addComment(
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000000',
            'First comment',
            10,
            () => { done() }
        )
    })

    test('Fetch all comments, returns array', done => {
        fetchComment.getAllComments('00000000-0000-0000-0000-000000000000', res => {
            expect(res[0].videoId).toBe('00000000-0000-0000-0000-000000000000')
            expect(res[0].author).toBe('00000000-0000-0000-0000-000000000000')
            expect(res[0].commentId).toBeTruthy()
            done()
        })
    })
})

describe('Test insert', () => {
    test('Insert single comment', done => {
        addComment(
            '00000000-0000-0000-0000-000000000000',
            '00000000-0000-0000-0000-000000000000',
            'Second comment',
            10,
            res => {
                expect(res).toBe(true)
                done()
            })
    })
})

afterAll(done => {
    destroyUser('00000000-0000-0000-0000-000000000000', () => {
        // We need to close the database connection or Jest will hang!
        sql.close()
        done()
    })
})
