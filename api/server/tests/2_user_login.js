const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../index.js')

chai.use(chaihttp)
chai.should()

describe('Login user at /login', () => {
    //Test correct input
    it('API should return 200', (done) => {
        chai.request(app)
        .post('/login')
        .type('application/json')
        .send({username: "username", password: "password"})
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
    //Test invalid password
    it('API should return 401', (done) => {
        chai.request(app)
        .post('/login')
        .type('application/json')
        .send({username: "username", password: "1234567"})
        .end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })
})

describe('Invalid username to /login', () => {
    it('API should return 400', (done) => {
        chai.request(app)
        .post('/login')
        .end((err, res) => {
            res.should.have.status(400)
            done()
        })
    })
})