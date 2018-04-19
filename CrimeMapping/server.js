var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require("mongodb");

var routes = require('./server/routes/routes')
var app = express();

//View Engine
/*app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);*/

// Set Static Folder
app.use(express.static(path.join(__dirname,'client/dist')));

// Body PARSER MW
app.use(bodyParser.json());

app.use('/', routes);

app.set('port', 3000);

app.listen(app.get('port'), function(){
    console.log('HEYHEY, server is up.');
});

/*// Create a database variable outside of the database connection callback to reuse the connection pool in the app.
var database;
var MONGODB_URI = "mongodb://d3167502:12345@ds237409.mlab.com:37409/crimedata";
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGODB_URI, function (err, db) {
  if (err) {
    console.log(err);
  } else {
    const crimedata = db.db('crimedata');
    var crimerecord = crimedata.collection('crimerecord');
    // crimerecord.insertOne({id: 2, lat: '37', long: '-122', time: '04/04/2018', type: 'car accident'});
    // Find all
    crimerecord.find({}).toArray(function(err, result){
        if (err) {
            onsole.log(err);
        } else {
            console.log(result);
        }
    });
    // Find One
    crimerecord.findOne({time: '04/04/2018'}, function(err, result) {
        if (err) throw err;
        console.log(result);
      });
  }

  // Save database object from the callback for reuse.
  console.log("Database connection ready");
});*/

