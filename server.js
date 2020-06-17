var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');


var dashboardRoute = require('./routes/dashboard.router');
var loginRoute = require('./routes/login.router');

var loginMiddleware = require('./middleware/login.middleware');

var app = express();

//config pug
app.set('view engine','pug');
app.set('views','./views');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//static file 
app.use(express.static('public'));


app.get('/', function (req, res) {  
    res.render( __dirname + "/" + "views/login" );  
});

//logout
app.get('/logout',function(req,res){
	req.session.loggedIn = false;
	res.redirect('/login');
});

app.use('/dashboard',loginMiddleware.requireLogin,dashboardRoute);
app.use('/login',loginRoute);

app.listen(3000,function(){
    console.log('Server is listening on port 3000');
});


