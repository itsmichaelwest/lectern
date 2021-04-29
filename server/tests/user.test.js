const { addUser, destroyUser } = require('../database/user/user')

const sql = require('../database/sql')

describe('Test adding user', () => {
    const profile = {
        oid: '00000000-0000-0000-0000-000000000000',
        _json: {
            email: 'example@example.com'
        }
    }

    test('Add user', done => {
        addUser (
            profile,
            'Joe Bloggs',
            null,
            res => {
                expect(res).toBe(true)
                done()
            }
        )
    })
})

describe('Test deleting user', () => {
    test('Delete user', done => {
        destroyUser('00000000-0000-0000-0000-000000000000', res => {
            expect(res).toBe(true)
            done()
        })
    })
})

afterAll(() => {
    sql.close()
})
