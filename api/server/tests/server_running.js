const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../index.js')

chai.use(chaihttp)
chai.should()

describe('Check for status 200 at /', () => {
    it('API should return 200', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
        })
    })
})

