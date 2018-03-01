var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


app.get('/', function(req,res){
  res.render('index');
});

app.get('/grizzly', function(req,res){
  res.render('grizzly');
});

app.get('/canyonCreek', function(req,res){
  res.render('canyonCreek');
});
app.get('/boulderCreek', function(req,res){
  res.render('boulderCreek');
});

function getRoute(req,res){
	var context = {};
	context.type="GET";
	context.inputElms=[];
	for (var field in req.query)
		context.inputElms.push({'property':field,'value':req.query[field]});
	res.render('getPost',context);
}

function postRoute(req,res){
	var context = {};
	context.type="POST";
	context.inputElms=[];
	for (var field in req.body)
		context.inputElms.push({'property':field,'value':req.body[field]});
	res.render('getPost',context);
}

app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on port '+app.get('port')+'; press Ctrl-C to terminate.');
});


