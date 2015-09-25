var mongoose = require('mongoose');
var zipcodes = require('zipcodes');

var employerSchema = new mongoose.Schema({
  name: String,
  role: String,
  startdate: Date,
  enddate: Date
});


var userSchema = new mongoose.Schema({  
  email: String,
  cohort: String,
  zip: Number,
  city: String,
  state: String,
  latitude: Number,
  longitude: Number,
  github: String,
  twitter: String,
  website: String,
  gender: String,
  race: String,
  
  // TODO -- coordinate how employment data will be passed from client
  currentemployer: [employerSchema],
  prioremployers: [employerSchema],
  
  
  thesis: String,
  thesisurl: String,
  greenfield: String,
  legacy: String,
  technologies: Array,
});

// middleware to retreive exact location data
userSchema.pre('save', function(next) {
  var temp = zipcodes.lookup(this.zip);
  this.city = temp.city;
  this.state = temp.state;
  this.latitude = temp.latitude;
  this.longitude = temp.longitudel;
  next();
});

module.exports = mongoose.model('User', userSchema);
