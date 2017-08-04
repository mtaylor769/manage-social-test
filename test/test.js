process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require('../index')

describe('App', () => {
  describe('GET / (smoke test)', () => {
    it('should respond with oauth request', (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err)
        // there should be a 200 status code
        should.equal(res.status, 200)
        // the response should be JSON
        should.equal(res.type, 'application/json')
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        should.equal(res.body.status,'success')
        // the JSON response body should have a
        // key-value pair of {"data": [2 objects]}
        should.equal(res.body.data.length, 2)
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
        'message', 'somekey'
        )
        done()
      })
    })
  })
/*
  describe('GET /oauth_request (smoke test)', () => {
    it('should respond with oauth request', (done) => {
      chai.request(app)
      .get('/oauth_request')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err)
        // there should be a 200 status code
        should.equal(res.status, 200)
        // the response should be JSON
        //should.equal(res.type, 'application/json')
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        should.equal(res.body.status,'success')
        // the JSON response body should have a
        // key-value pair of {"data": [2 user objects]}
        //should.equal(res.body.data.length, 2)
        // the first object in the data array should
        // have the right keys
        // res.body.data[0].should.include.keys(
        // 'message', 'somekey'
        // )
        done()
      })
    })
  })  */
})