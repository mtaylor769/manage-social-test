const express = require("express")
const request = require("request")
const _ = require("lodash")
const json = require('json')
const Twit = require("twit")
const app = express()
app.locals.strftime = require("strftime")
app.locals.title = "ManageSocial Test"
app.locals.email = "mike@whatsmycut.com"
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.locals.port = 33076
//app.locals.port = 8080

const config = require("./config")
const T = new Twit(config)
app.tcreds = []

app.get("/", function (req, res) {
  res.render('login', { title: 'Manage Social Test', message: 'Hello there!' })
})

app.get("/oauth_request", function (req, res) {
  res.type("text/plain")
  T.post("https://api.twitter.com/oauth/request_token", 
    { 
      skip_status: true, 
      oauth_callback:"http%3A%2F%2F" + req.hostname + "%3A"+ app.locals.port + "%2Fsign-in-with-twitter%2F",
      oauth_consumer_key: config.consumer_key,
      oauth_nonce:"ea9ec8429b68d6b77cd5600adbbb0456",
      oauth_signature:config.app_only_auth,
      oauth_signature_method:"HMAC-SHA1",
      oauth_timestamp:Date.now(),
      oauth_version:"1.0"
    })
  .catch(function (err) {
    console.log("caught error", err.stack)
  })
  .then(function (result) {
    let pairs = result.data.split('&')
    let vals = []
    _.each(pairs, function(t) {
      let sp = t.split('=')
      vals[sp[0]] = sp[1]
    })
    app.tcreds = vals
    res.status(302).redirect("/sign-in-with-twitter")
  })
  
})

app.get("/sign-in-with-twitter", function(req, res){
  //console.log("/sign-in-with-twitter called", req.query)
  if (undefined === req.query['oauth_verifier']) {
    T.get('https://api.twitter.com/oauth/authenticate', {'oauth_token': app.tcreds['oauth_token']})
    .catch(function (err) {
      console.log("caught error", err.stack)
    })
    .then(function (result) {
      res.send(result.data)
    })
  } else {
    T.post('https://api.twitter.com/oauth/access_token', 
      {
        oauth_consumer_key: config.consumer_key,
        oauth_nonce:"ea9ec8429b68d6b77cd5600adbbb0456",
        oauth_signature:config.app_only_auth,
        oauth_signature_method:"HMAC-SHA1",
        oauth_timestamp:Date.now(),
        oauth_version:"1.0",
        oauth_token: req.query['oauth_token'],
        oauth_verifier: req.query['oauth_verifier']
      })
    .catch(function (err) {
      console.log("caught error", err.stack)
    })
    .then(function (result) {
      let pairs = result.data.split('&')
      let vals = []
      _.map(pairs, function(t) {
        let sp = t.split('=')
        vals[sp[0]] = sp[1]
      })
      app.tcreds = vals
      res.status(200).redirect('/tweets')
    })
  
  //  res.status(200).redirect('/tweets')
  }
})


app.get("/connect", function(req, res){
  // TODO: Get User Creds
  //console.log("connect: app.tcreds", app.tcreds)
  T.get('account/settings', app.tcreds, profileData)
  function profileData(err, data) {
    if (err) {
      //res.redirect("/")
    }
    // TODO: Add map function to regex @ and # urls
    console.log(data)
    res.send(data)  
  }
})

app.get("/tweets", function(req, res){
  // TODO: Get Tweets
  let params = { 
    screen_name: app.tcreds['screen_name'],
    count: 100 
  }
  T.get('statuses/user_timeline', params, searchedData);

  function searchedData(err, data) {
    if (err) {
      res.redirect("/")
    }
    // TODO: Add map function to regex @ and # urls
    console.log(data)
    res.render('tweets', {"tweets": data})
  }
})

app.post("/disconnect", function(req, res){
  // TODO: Disconnect user
  app.tcreds = []
  res.redirect("/")
  res.send("disconnect!")
})

app.listen(app.locals.port, function () {
  console.log("Listening on port " + app.locals.port)
})

module.exports = app