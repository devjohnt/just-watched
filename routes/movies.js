//  ===  REQUIRES  ======================================================================
var
    express = require("express"),
    router  = express.Router(),
    request = require("request"),
    db      = require("../models"),
    movies  = require("../middleware/movies"),
    auth    = require("../middleware/auth");

//  === INDEX - LIST ALL MOVIES IN DB  ==================================================
router.get("/", function (req, res) {
    movies.listAll(req, res);
});

//  ===  CREATE - OMDb API MOVIE ENTRY TO DB  ===========================================
router.post("/", auth.isLoggedIn, function (req, res) {
    var imdbID = req.body.imdbID;
    movies.saveMovieToDb(imdbID, function() {
        res.redirect("/movies");
    });
});

//  ===  SHOW - INFO ABOUT SPECIFIC MOVIE - OMDb API  ===================================
router.get("/:imdbID", movies.isMovieSavedToDb, function (req, res) {
    // Get IMDB ID from query
    var imdbID = req.params.imdbID;
    // Create request url for OMDb API
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    // OMDb API request
    request(url, function (error, response, body) {
        // Error handling
        if (error) {
            console.log("Something happened! ", error);
        }
        // If no error and response status is OK
        else if (!error && response.statusCode == 200) {
            // Parse JSON
            var data = JSON.parse(body);
            // Find the movie from DB
            db.Movie.findOne({'Title': data.Title}, function(err, movie) {
                // Error handling
                if(err) {
                    console.log(err);
                }
                // Render movie page
                else {
                    res.render("movies/movie_omdb", {data: data, movie: movie});
                }
            });            
        }
    });
});

//  ===  EXPORTS  =======================================================================
module.exports = router;