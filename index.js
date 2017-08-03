const express = require('express')
const twitter = require('twit')
const app = express()
app.locals.strftime = require('strftime')
app.locals.title = 'ManageSocial Test'
app.locals.email = 'mike@whatsmycut.com'

var assert = require('chai').assert;


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/oauth_request', function (req, res) {
  res.send('oauth request!')
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

