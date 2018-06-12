var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  title: String,
  description: String,
  status: String,
  tasks: [{name: String, done: Boolean}]
});
var Card = mongoose.model('Card', CardSchema);

var c = new Card({
  title: 'Build REST api',
  description: 'REST api to retrieve card data.',
  status: 'in-progress',
  tasks: [{name: 'Install mongoose npm package', done: true}]
});
console.log(c);

module.exports = mongoose.model('Card', CardSchema);
