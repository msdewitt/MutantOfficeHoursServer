//Create references for libraries
var express = require('express');
var http = require('http');
var firebase = require('firebase');
var dotenv = require('dotenv');

//Express server setup
var app = express();
var server = http.createServer(app);
dotenv.load();

//Authenticate Firebase
firebase.initializeApp({
  serviceAccount: "firebaseCredentials.json",
  databaseURL: "https://mutant-officehours.firebaseio.com"
});

//Get reference to firebase
var ref = firebase.database().ref();

//Listen for new texts being created on firebase
var textRef = ref.child('texts');
textRef.on('child_added',function(snapshot){
  console.log(snapshot.val());
})

server.listen(3030, function(){
  console.log('listening on http://localhost:3030');
});
