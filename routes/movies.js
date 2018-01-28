//  =====================================================================================
//  ===  MOVIES ROUTES  =================================================================
//  =====================================================================================
var
    express = require("express"),
    router  = express.Router(),
    request = require("request"),
    Movie   = require("../models/movie"),
    movies  = require("../middleware/movies");

//  === INDEX - LIST ALL MOVIES IN DB  ==================================================
router.get("/", function (req, res) {
    Movie.find({}, function (err, movies) {
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
            Movie.create(movie, function (err, obj) {
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

//  ===  SHOW - INFO ABOUT SPECIFIC MOVIE - jW API  =====================================
router.get("/:imdbID", function (req, res) {
    res.send("Respond of /movies/:imdbID");
    // Movie.findOne({imdbID: req.params.imdbID}, function(err, data) {
    // 	if(err) {
    // 		console.log(err);
    // 	} else {
    // 		res.render("movies/movie_jw", {data: data});
    // 	}
    // });
});

//  ===  SHOW - INFO ABOUT SPECIFIC MOVIE - OMDb API  ===================================
router.get("/imdb/:imdbID", function (req, res) {
    var imdbID = req.params.imdbID;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
    request(url, function (error, response, body) {
        if (error) {
            console.log("Something happened! ", error);
        } else if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("movies/movie_imdb", { data: data });
        }
    });
});

//  =====================================================================================
//  ===  EXPORT  ========================================================================
//  =====================================================================================
module.exports = router;

// In the future, OMDb API will feed the movies/new route with data. Data will be shown
// in form. Movie data can be editted. After confirmation movie will saved to db.
// //  ===  NEW - SHOW NEW MOVIE FORM  =====================================================
// router.get("/movies/new", function(req, res) {
// 	res.render("movies/new");
// });

// //  ===  CREATE - MANUAL MOVIE ENTRY TO DB  =============================================
// router.post("/", function(req, res) {
// 	var newMovie = {
// 		imdbID: req.body.imdbID,
// 		title: req.body.title,
// 		year: req.body.year
// 	};
// 	Movie.create(newMovie, function(err, movie) {
// 		if(err) {
// 			console.log(err);
// 			res.redirect("/movies/new");
// 		} else{
// 			console.log("Movie has been saved to db: ", movie);
// 			res.redirect("/movies/" + movie.imdbID);
// 		}
// 	});
// });