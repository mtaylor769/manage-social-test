const express = require('express')
const Twit = require('twit')
const app = express()
app.locals.strftime = require('strftime')
app.locals.title = 'ManageSocial Test'
app.locals.email = 'mike@whatsmycut.com'

app.get('/', function (req, res) {
  res.type('application/json')
  res.send({
    'status': 'success',
    'data': [
      {
        'message': 'Hello World!',
        'somekey': 'somevalue'
      },
      {
        'message': 'Goodbye, cruel World!'
        'somekey': 'someval'
      }
    ]
  })
})

app.get('/oauth_request', function (req, res) {
  res.type('application/json')
  res.send()
})

app.post('/connect', function(req, res){
  res.send('connect!')
})

app.get('/tweets', function(req, res){
  res.send('tweets!')
})

app.post('/disconnect', function(req, res){
  res.send('disconnect!')
})

app.listen(8080, function () {
  console.log('Listening on port 8080.')
})

module.exports = app