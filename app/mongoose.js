var mongoose = require('mongoose');
var db = mongoose.connection;

var dbuser = 'adminobi';
var dbpassword = 'nonso9860563';
module.exports = mongoose.connect('mongodb://' + dbuser +':' + dbpassword +'@ds131621.mlab.com:31621/cards');
db.on('error', function() {
  console.error('Problem connecting :(');
});
db.on('open', function() {
  console.log("We're connected!")
});
