const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
    test('It should respond with 200', done => {
        request(app)
            .get('/')
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })
})