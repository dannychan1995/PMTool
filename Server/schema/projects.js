var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var ProjectsSchema = new Schema({
  title    : String,
  description    : String,
  remarks : String,
  createdAt : {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

var Projects = mongoose.model( 'Projects', ProjectsSchema );
module.exports = Projects;
