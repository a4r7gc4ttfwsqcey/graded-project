const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../index.js')

chai.use(chaihttp)
chai.should()

describe('Register user at /user', () => {
    //Test correct input
    it('API should return 201', (done) => {
        chai.request(app)
        .post('/user')
        .type('application/json')
        .send({username: "username", password: "password"})
        .end((err, res) => {
            res.should.have.status(201)
            done()
        })
    })
    //Test incorrect input (too short)
    it('API should return 500', (done) => {
        chai.request(app)
        .post('/user')
        .type('application/json')
        .send({username: "123", password: "1234567"})
        .end((err, res) => {
            res.should.have.status(500)
            done()
        })
    })
})

