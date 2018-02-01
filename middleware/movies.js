//  ===  REQUIRES  ======================================================================
var
    db = require("../models"),
    request = require("request"),
    movies = {};

//  ===  CREATE JS OBJ FROM JSON  =======================================================
movies.jsonToObj = function jsonToObj(json) {
    var obj = new db.Movie({
        Title: json.Title,
        Year: json.Year,
        Released: json.Released,
        Runtime: json.Runtime,
        imdbID: json.imdbID,
        Type: json.Type,        
        Poster: json.Poster,
        Plot: json.Plot,
        Ratings: json.Ratings
    });
    return obj;
}

//  ===  CHECK THAT THE MOVIE IS IN DB  =================================================
movies.isMovieSavedToDb = function isMovieSavedToDb(req, res, next) {
    // Movie imdbID from request body
    var imdbID = req.params.imdbID;
    // Check if is movie saved in DB
    db.Movie.findOne({ 'imdbID': imdbID }, function (err, movie) {
        // Error handling
        if (err) {
            console.log(err);
        }
        // If no movie found on DB, then save movie to DB
        else if (movie === null) {
            movies.saveMovieToDb(imdbID, next);
        }
        // If movie is already saved moving on with the next arg
        else {
            return next();
        }
    });
};

//  ===  SAVE MOVIE TO DB  ==============================================================
movies.saveMovieToDb = function saveMovieToDb(imdbID, next) {
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    request(url, function (error, response, body) {
        // Error handling
        if (error) {
            console.log("Something happened! ", error);
        }
        // Take movie data and save to DB
        else if (!error && response.statusCode == 200) {
            // Parse JSON
            var data = JSON.parse(body);
            // Convert it to jW style obj
            var movie = movies.jsonToObj(data);
            // Save movie to DB
            db.Movie.create(movie, function (err, obj) {
                // Error handling
                if (err) {
                    console.log(err);
                }
                // If saving is successful move on
                else {
                    return next();
                }
            });
        }
    });
}

//  ===  LIST ALL MOVIES FROM DB  =======================================================
movies.listAll = function listAll(req, res, next) {
    // Find all movies
    db.Movie.find({}, function(err, movies) {
        // Error handling
        if (err) {
            console.log(err);
        }
        // Render movies index page
        else {
            res.render("movies/index", {movies: movies});
        }
    });
}

//  ===  EXPORTS  =======================================================================
module.exports = movies;