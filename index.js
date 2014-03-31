var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect('mongodb://localhost/codingHouseHours');

var Appointment = mongoose.model('Appointment', {
	instructor: {type: String, required: true},
	student: {type: String, required: false},
	startDate: {type: Date, required: true},
	endDate: {type: Date, required: true}
});

app.use(express.static(__dirname + '/public'));

app.get('/hello.txt', function(request, response){
  response.send('Hello World');
});

app.post("/appointment", function(request,response){
	var appointment = new Appointment({startDate: new Date(), endDate: new Date(), instructor: "Mike"});
//	console.log("REQUEST PARAMS", request.params);
//	console.log("REQUEST QUERY", request.query);
//	console.log("REQUEST BODY", request.body);

	appointment.save(function(error){
		if (error){
			response.send("ERROR SAVING APPOINTMENT");
			console.error("ERROR SAVING APPOINTMENT", error);
		} else{
			response.send("Appointment successfully saved");
		}
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/codingHouseHours', function(err, db){
	var collection = db.collection('appointments');
	collection.find().toArray(function(err, results) {
	  console.dir(results);
	  db.close();
	});
});

// MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
// 	// console.log("YAY CONNECTED TO DATABASE", db);
// 	if(err) throw err;

// 	var collection = db.collection('test_insert');
// 	collection.insert({a:2}, function(err, docs) {
// 		console.log("THE ERROR IS", err);
// 		console.log("THE DOCS ARE", docs);
// 	     collection.count(function(err, count) {
// 	       console.log(format("count = %s", count));
// 	     });

// 	//   // Locate all the entries using find
// 	collection.find().toArray(function(err, results) {
// 	    console.dir(results);
// 	    // Let's close the db
// 	    db.close();
// 	  });
// 	});
// 	console.log("HELLO");
// })
