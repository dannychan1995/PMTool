
var express = require('express');
var http = require('http')
var request = require("request");
var mongoose = require("mongoose");
const routes = require('./routes');


var app = express();
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('admin_page'));

const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://'+dbUser+':'+dbPassword+'@cluster0-zcfaz.azure.mongodb.net/develop?retryWrites=true';
mongoose.connect(mongoDB , { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(routes);

var Projects = require('./schema/projects');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/admin_page/index.html');
});

app.get('/testaddd', function(req, res){
  new Projects({
    title    : "testTitle",
    description    : "ttt",
  }).save( function ( err, todo, count ){
    if( err ) return next( err );

    res.json(todo)
  });
});

  res.sendFile(__dirname + '/admin_page/index.html');
});
