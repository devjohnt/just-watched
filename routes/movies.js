//  ===  REQUIRES  ======================================================================
var
    express = require("express"),
    router  = express.Router(),
    request = require("request"),
    db      = require("../models"),
    movies  = require("../middleware/movies");

//  === INDEX - LIST ALL MOVIES IN DB  ==================================================
router.get("/", function (req, res) {
    db.Movie.find({}, function (err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render("movies/index", { movies: movies });
        }
    });
});

//  ===  CREATE - OMDb API MOVIE ENTRY TO DB  ===========================================
router.post("/", function (req, res) {
    var imdbID = req.body.imdbID;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    request(url, function (error, response, body) {
        if (error) {
            console.log("Something happened! ", error);
        } else if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var movie = movies.jsonToObj(data);
            db.Movie.create(movie, function (err, obj) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(obj);
                    res.redirect("/movies");
                }
            });
        }
    });
});

//  ===  SHOW - INFO ABOUT SPECIFIC MOVIE - OMDb API  ===================================
router.get("/:imdbID", function (req, res) {
    var imdbID = req.params.imdbID;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    request(url, function (error, response, body) {
        if (error) {
            console.log("Something happened! ", error);
        } else if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            db.Movie.findOne({'Title': data.Title}, function(err, movie) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("movies/movie_omdb", {data: data, movie: movie});
                }
            });            
        }
    });
});

//  ===  EXPORTS  =======================================================================
module.exports = router;