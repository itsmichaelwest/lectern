const request = require('supertest')
const app = require('../app')

const setupTests = require('./setupTests.js')

const guid = '00000000-0000-0000-0000-000000000000'

// Set up user and a test video
beforeAll(() => {
    setupTests.init()
})

describe('Video API routes', () => {
    describe('Test video GET', () => {
        test('GET video', done => {
            request(app)
                .get(`/api/v1/video/${guid}`)
                .then(response => {
                    expect(response.statusCode).toBe(200)
                    done()
                })
        })
    })
})

describe('Request upload without being authenticated', () => {
    test('It should respond with 401', done => {
        request(app)
            .post('/api/v1/video/upload')
            .then(response => {
                expect(response.statusCode).toBe(401)
                done()
            })
    })
})

// Remove test user and their data
afterAll(() => {
    setupTests.teardown()
})