//  =====================================================================================
//  KICK-OFF  ===========================================================================
//  =====================================================================================
var
	express       = require("express"),
	app           = express(),
	port          = process.env.PORT || 3000,
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	configDB      = require("./config/database"),
	passport      = require("passport"),
	flash         = require("connect-flash"),
	morgan        = require("morgan"),
	cookieParser  = require("cookie-parser"),
	session       = require("express-session");
	
//  =====================================================================================
//  CONFIGURATION  ======================================================================
//  =====================================================================================
app.set("view engine", "ejs");                        //Setup template engine to EJS
app.use(express.static(__dirname + "/public"));       //Setup static design files directory
app.use(bodyParser.urlencoded({extended: true}));     //Get information from HTML forms
app.use(morgan('dev'));                               //Log every request to the console
app.use(cookieParser());                              //Read cookies (needed for auth)

mongoose.connect(configDB.url, configDB.options);     //Connect DB
mongoose.Promise = global.Promise;                    //Get Mongoose to use the global promise library
mongoose.set('debug', true);                          //Debug mode is open for mongoose

app.use(session({
	secret: "deep-in-the-code",
	resave: false,
	saveUninitialized: false
}));                                                  //Not related to passport package
app.use(passport.initialize());                       //Start passport package
app.use(passport.session());                          //Starting a session for passport package?
require("./config/passport")(passport);               //Passport package configuration

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});                                                   //Make req.user obj to reachable for views

//  =====================================================================================
//  ROUTES  =============================================================================
//  =====================================================================================
var
	indexRoutes  = require("./routes/index"),
	authRoutes   = require("./routes/auth"),
	moviesRoutes = require("./routes/movies"),
	searchRoutes = require("./routes/search");

app.use("/", authRoutes);                              //Use authRoutes
app.use("/movies", moviesRoutes);                      //Use moviesRoutes
app.use("/search", searchRoutes);                      //Use searchRoutes
app.use("/", indexRoutes);                             //Use indexRoutes

//  =====================================================================================
//  LAUNCH SERVER  ======================================================================
//  =====================================================================================
app.listen(port, function(){
  console.log("Daris is listening for justWatched... IP address is 127.0.0.1:" + port);
});