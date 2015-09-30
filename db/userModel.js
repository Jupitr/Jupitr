var mongoose = require('mongoose');
var zipcodes = require('zipcodes');

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
  currentemployer: String,
  currentemployerrole: String,
  currentemployerstartdate: Date,
  prioremployer1: String,
  prioremployer1role: String,
  prioremployer1startdate: Date,
  prioremployer1enddate: Date,
  prioremployer2: String,
  prioremployer2role: String,
  prioremployer2startdate: Date,
  prioremployer2enddate: Date,
  prioremployer3: String,
  prioremployer3role: String,
  prioremployer3startdate: Date,
  prioremployer3enddate: Date,
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
