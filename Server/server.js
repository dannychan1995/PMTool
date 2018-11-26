
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

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://application:passw0rd@cluster0-zcfaz.azure.mongodb.net/develop?retryWrites=true';
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

app.get('/test', function(req, res){
  request({
    url: "  https://www.agoda.com/zh-hk/metropark-hotel-mongkok_2/hotel/hong-kong-hk.html?checkin=2018-09-04&los=3&adults=2&rooms=1&cid=1732636&tag=cc4d03f4-6efa-9df4-c065-dc431db8b428&searchrequestid=5e54fee3-9330-4a2d-9238-21ff79478332&abd=1&tabbed=true\n",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) { return; }
    var $ = cheerio.load(b);
    console.log($(".ChildRoomsList-roomCell.relativeCell").text());

    var result = [];
    var titles = $("li");
    for(var i=0;i<titles.length;i++) {
      result.push($(titles[i]).text());
    }
    // console.log(result);
  });

  res.sendFile(__dirname + '/admin_page/index.html');
});
