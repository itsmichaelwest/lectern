const { addUser, destroyUser } = require('../database/user/user')

async function init() {
    const profile = {
        oid: '00000000-0000-0000-0000-000000000000',
        _json: {
            email: 'example@example.com'
        }
    }

    console.log('Add user/channel')
    
    await addUser (
        profile,
        'Joe Bloggs',
        null
    )
}

async function teardown() {
    console.log('Destroy user')
    await destroyUser('00000000-0000-0000-0000-000000000000')
}

module.exports = {
    init,
    teardown
}