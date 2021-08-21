var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/contacto', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/contacto')(app, mongoose);
var contactoCtrl = require('./controllers/contacto');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var contacto = express.Router();

contacto.route('/contacto')
  .get(contactoCtrl.findAllcontacto)
  .post(contactoCtrl.addcontacto);

contacto.route('/contacto/:id')
  .get(contactoCtrl.findById)
  .put(contactoCtrl.updatecontacto)
  .delete(contactoCtrl.deletecontacto);

app.use('/api', contacto);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

