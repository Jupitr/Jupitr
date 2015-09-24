var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({  
  email: String,
  cohort: String,
  zip: Number,
  city: String,
  state: String,
  github: String,
  twitter: String,
  website: String,
  age: Number,
  gender: String,
  race: String,
  thesis: String,
  greenfield: String,
  legacy: String,
  technologies: Array,
});

// possible pre middleware
  // get exact location data

module.exports = mongoose.model('User', userSchema);
