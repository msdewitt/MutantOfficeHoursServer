//Create references for libraries
var express = require('express');
var http = require('http');
var firebase = require('firebase');
var dotenv = require('dotenv');
var twilio = require('twilio');

//Express server setup
var app = express();
var server = http.createServer(app);
dotenv.load();

//Authenticate Firebase
firebase.initializeApp({
  serviceAccount: "firebaseCredentials.json",
  databaseURL: "https://mutant-officehours.firebaseio.com"
});

//Authenticate twilio and create twilio client
var twilioClient = twilio(process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN);

//Get reference to firebase
var ref = firebase.database().ref();

//Listen for new texts being created on firebase
var textRef = ref.child('texts');
textRef.on('child_added',function(snapshot){
  var text = snapshot.val();
    twilioClient.messages.create({
      body: text.name + ", I'm available to see you now to discuss " + text.topic,
      to: text.phone,  // Text this number
      from: process.env.TWILIO_PHONE // From a valid Twilio number
  }, function(err, message) {
    if(err) {
        console.log(err.message);
      }
  });
})

server.listen(3030, function(){
  console.log('listening on http://localhost:3030');
});
