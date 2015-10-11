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
  twitter: String,
  avatar: String,
  linkedin: String,
  headline: String,
  hasGivenPermission: Boolean,
  website: String,
  gender: String,
  // race: String,
  // currentemployer: String,
  // currentemployerrole: String,
  // currentemployertype: String,
  // currentemployerstartdate: String,
  // prioremployer1: String,
  // prioremployer1role: String,
  // prioremployer1type: String,
  // prioremployer1startdate: String,
  // prioremployer1enddate: String,
  // prioremployer2: String,
  // prioremployer2role: String,
  // prioremployer2type: String,
  // prioremployer2startdate: String,
  // prioremployer2enddate: String,
  // prioremployer3: String,
  // prioremployer3role: String,
  // prioremployer3type: String,
  // prioremployer3startdate: String,
  // prioremployer3enddate: String,
  greenfield: String,
  greenfieldurl: String,
  legacy: String,
  legacyurl: String,
  thesis: String,
  thesisurl: String
  // technologies: Array,
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
