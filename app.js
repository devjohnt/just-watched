//  ===  REQUIRES  ======================================================================
var
	express        = require("express"),
	app            = express(),
	port           = process.env.PORT || 3000,
	bodyParser     = require("body-parser"),
	passport       = require("passport"),
	flash          = require("connect-flash"),
	morgan         = require("morgan"),
	cookieParser   = require("cookie-parser"),
	session        = require("express-session"),
	methodOverride = require("method-override");
	
//  ===  CONFIGURATION  =================================================================
app.set("view engine", "ejs");                     // Setup template engine to EJS
app.use(express.static(__dirname + "/public"));    // Setup static design files directory
app.use(bodyParser.urlencoded({extended: true}))   // Get information from HTML forms
app.use(morgan('dev'));                            // Log every request to the console
app.use(cookieParser());                           // Read cookies (needed for auth)
app.use(flash());                                  // Use flash messages
app.use(methodOverride('_method'));                // Enables PUT and DELETE requests

app.use(session({                                  // Not related to passport package
	secret: "deep-in-the-code",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());                    // Start passport package
app.use(passport.session());                       // Start a session
require("./config/passport")(passport);            // Passport package configuration

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});                                                   

//  ===  ROUTES  ========================================================================
app.use("/", require("./routes/auth"));                 // Use Auth Routes
app.use("/movies", require("./routes/movies"));         // Use Movies Routes
app.use("/users/:username/diary", require("./routes/diary")); // Use Diary Routes
app.use("/search", require("./routes/search"));         // Use Search Routes
app.use("/", require("./routes/index"));                // Use Index Routes

//  ===  LAUNCH SERVER  =================================================================
app.listen(port, function(){
  console.log("Daris is listening for justWatched... IP address is 127.0.0.1:" + port);
});