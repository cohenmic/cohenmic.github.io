
var express=require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({secret:'mySecret'}));
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/', function(req,res,next){
	var context = {};
	res.render('home');
});
app.get('/show', function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
		if(err){
			console.log("fail");
			next(err);
			return;
		}
		context.results = JSON.stringify(rows);
		res.send(context.results);
	});
});

app.get('/insert', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO todo (`name`,`done`,`due`) VALUES (?,?,?)", [req.query.name, req.query.done, req.query.due], function(err, result){
		if(err){
			next(err);
			return;
		}
		res.render('home');	
	});
});

app.get('/delete', function(req,res,next){
	var context = {};
	mysql.pool.query("DELETE FROM todo WHERE id=?", [req.query.id], function(err, result){
		if(err){
			next(err);
			return;
		}
		context.results = "Deleted "+req.query.id;
		res.send(context.results);
	});
});	



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

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
