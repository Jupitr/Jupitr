var mongoose = require('mongoose');
var zipcodes = require('zipcodes');

// sub document to be included in user documents
var employerSchema = new mongoose.Schema({
  company: String,
  role: String,
  startdate: Date,
  enddate: Date
});

var userSchema = new mongoose.Schema({  
  name: String,
  githublogin: String,
  email: String,
  cohort: String,
  zip: Number,
  city: String,
  state: String,
  latitude: Number,
  longitude: Number,
  githublink: String,
  twitter: String,
  website: String,
  gender: String,
  race: String,
  currentemployer: [employerSchema],
  prioremployer1: [employerSchema],
  prioremployer2: [employerSchema],
  prioremployer3: [employerSchema],
  thesis: String,
  thesisurl: String,
  greenfield: String,
  legacy: String,
  technologies: Array,
});

// middleware to retrieve precise location data
userSchema.pre('save', function(next) {
  if (this.zip) {
    var temp = zipcodes.lookup(this.zip);
    this.city = temp.city;
    this.state = temp.state;
    this.latitude = temp.latitude;
    this.longitude = temp.longitude;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
