//  ===  REQUIRES  ======================================================================
var
    express = require("express"),
    router = express.Router(),
    request = require("request"),
    db = require("../models/");

//  ===  INDEX - LIST ALL MOVIES IN THE DIARY  ==========================================
router.get("/", function (req, res) {
    res.render("diary/index");
});

//  ===  NEW - SHOW NEW DIARY ENTRY FORM  ===============================================
router.get("/new", function(req, res) {
    var imdbID = req.query.imdbID;
    var movieId = req.query.movieId;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    request(url, function (error, response, body) {
        if(error) {
            console.log("Something happened! ", error);
        } else if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("diary/new", { data: data, movieId: movieId });
        }
    });
});

//  ===  CREATE - ADD NEW DAIRY ENTRY  ==================================================
router.post("/", function(req, res) {    
    var diaryEntry = new db.Diary({
        watchDate: req.body.date,
        movie: [],
    });
    diaryEntry.movie.push(req.body.movieId);
    db.User.findOne({'username': req.user.username}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            user.diary.push(diaryEntry);
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    res.send('OK');
                }
            });
        }        
    });
});

//  ===  EXPORTS  =======================================================================
module.exports = router;