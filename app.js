var express     =   require("express"),
    app         =   express(),
    bodyParser  =   require("body-parser"),
    mongoose    =   require("mongoose");
    
//Config
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017", {useMongoClient: true});  //Connect DB
mongoose.Promise = global.Promise;                                      //Get Mongoose to use the global promise library

//DB Schemas
var UserSchema    =   new mongoose.Schema({
    username:   String,
    password:   String,
    email:      String
});

//DB Models
var User =   mongoose.model("User", UserSchema);

//Initial route
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("*", function(req, res) {
    res.send("No defined route, mate!");
}); 

//Server starts to listen
app.listen(3000, function(){
  console.log("Daris is listening for justWatched...");
});