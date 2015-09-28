var mongoose = require('mongoose');

// configuration for local development
// mongoose.connect('mongodb://localhost/jupitr');

// configuration for deployment
// var uri = 'ds051833.mongolab.com:51833/heroku_r1vgthql';
// var options = {
//   user: 'heroku_r1vgthql',
//   pass: '4aun3a4j2pv7oo9vvc8bup2eil'
// }

mongoose.connect('mongodb://heroku_r1vgthql:4aun3a4j2pv7oo9vvc8bup2eil@ds051833.mongolab.com:51833/heroku_r1vgthql');

var db = mongoose.connection;

db.once('open', function() {
  console.log('Connection established with MongoDB');
});
db.on('error', console.error.bind(console, 'connection error'));
db.on('diconnected', mongoose.connect);

module.exports = db;
