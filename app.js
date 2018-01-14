var express =   require("express"),
    app     =   express();

//Initial route
app.get("/", function(req,res) {
    res.send("Welcome to justWatched!");
});

//Server starts to listen
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Daris is listening for justWatched...");
});