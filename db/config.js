var mongoose = require('mongoose');

// TO DO -- determine how this should be configured to deploy
mongoose.connect('mongodb://localhost/jupitr');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.on('diconnected', mongoose.connect);

module.exports = db;
