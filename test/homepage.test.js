var request = require('supertest')
    ,   app = require('../server')

    describe('homepage', function () {
        it('checks that server is up', function (done) {
            request(app).get('/')
            .expect(200)
            .expect('hello user', done)
        })
    })

    