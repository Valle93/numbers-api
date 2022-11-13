var request = require('supertest')
    ,   app = require('../server')

    describe('homepage', function () {
        it('checks that server is up', function (done) {
            request(app).get('/')
            .expect(200)
            .expect('hello user', done)
        })
    })

    describe('post', function () {
        it('when user sends too big string', function (done) {
            request(app).post('/123123123')
            .expect(200)
            .expect('must not be more than 6 digits', done)
        })
    })

    describe('post', function () {
        it('when user sends a string and not anumber', function (done) {
            request(app).post('/123a')
            .expect(200)
            .expect('must be a number', done)
        })
    })

    describe('post', function () {
        it('when user sends an appropiate number', function (done) {
            request(app).post('/123')
            .expect(200)
            .expect('123', done)
        })
    })