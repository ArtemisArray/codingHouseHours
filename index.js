var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/hello.txt', function(request, response){
  response.send('Hello World');
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
