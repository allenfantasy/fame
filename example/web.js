var restify = require('restify');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

// Model
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
  message: String,
  author: String,
  date: Date
});
var Message = mongoose.model('Message', MessageSchema);

var server = restify.createServer({
  name: 'api-server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

server.get('/messages/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      res.send(404, {});
      return;
    }
    res.send(200, message);
    //res.send(req.params);
  });
  next();
});

server.get('/messages', function(req, res, next) {
  Message.find({}, function(err, messages) {
    res.send(200, messages);
  });
});

server.post('/messages', function(req, res, next) {
  Message.create({ message: req.params.message, author: req.params.author, date: new Date() }, function(err, message) {
    res.send(201, message);
  });
});

server.put('/messages/:id', function(req, res, next) {
});

server.del('/messages/:id', function remove(req, res, next) {
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
