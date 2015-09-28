var mongoose = require('mongoose');

var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/jupitr'
mongoose.connect(dbUri);

var db = mongoose.connection;

db.once('open', function() {
  console.log('Connection established with MongoDB');
});
db.on('error', console.error.bind(console, 'connection error'));
db.on('diconnected', mongoose.connect);

module.exports = db;
