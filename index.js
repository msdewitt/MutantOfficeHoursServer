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

server.listen(3030, function(){
  console.log('listening on http://localhost:3030');
});
