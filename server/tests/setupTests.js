const { addUser, destroyUser } = require('../database/user/user')
const uploadVideo = require('../database/video/upload')

const guid = '00000000-0000-0000-0000-000000000000'

function init() {
    destroyUser(guid)

    const profile = {
        oid: guid,
        _json: {
            email: 'example@example.com'
        }
    }
    
    addUser (
        profile,
        'Joe Bloggs',
        null
    )
    
    uploadVideo(
        guid,
        'Test Video',
        'This video is being uploaded as a test of the Video API.',
        0,
        'https://example.com',
        guid,
        100,
        'https://example.com'
    )    
}

function teardown() {
    destroyUser(guid)
}

module.exports = {
    init,
    teardown
}