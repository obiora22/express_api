var express = require('express');
var server = express();
var Card = require('./app/models/cards');
var mlab = require('./app/mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 9000;



// bodyParser extracts post data and makes it available
// via req.body.
server.use(bodyParser.urlencoded({extended: true})); // Mount middleware.
server.use(bodyParser.json()); // Mount middleware.


// Get instance of Router object.
var router = express.Router();
router.use(function(req, res, next) {
  console.log('Request hitting API!');
  next();
});

// Set routes for API
router.get('/', function(req, res) {
  res.json({message: 'Welcome to Kanaban API!'})
})

router.route('/cards')
.post(function(req, res) {
  var card = new Card({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    tasks: JSON.parse(req.body.tasks)
  });
  card.save(function(error) {
    if (error) res.send(error);
    res.json({message: 'Card has been created!'})
  });

})
.get(function(req, res) {
  Card.find(function(error, cards) {
    if (error) console.log(error);
    res.json(cards);
  });
})

router.route('/cards/:card_id')
.get(function(req, res) {
  Card.findById(req.params.card_id, function(error, card) {
    if (error) res.send(error);
    res.json(card);
  })
})
.put(function(req, res) {
  Card.findById(req.params.card_id, function(error, card) {

    var body = req.body;
    if (error) res.send(error);
    card.title = body.title;
    card.description = body.description;
    card.status = body.status;
    card.tasks = JSON.parse(body.tasks);

    card.save(function(error) {
      if (error) res.send(error);
      res.json({message: 'Card updated!'})
    })
  })
})
.delete(function(req, res) {
  Card.remove({_id: req.params.card_id}, function(error, card) {
    if (error) res.send(error);
    res.json({message: 'Card has been deleted!'});
  })
});

// 'router' middleware will be invoked for provided path.
server.use('/api', router)


server.listen(port, function() {
  console.log('Listening on port 9000 ...')
})
