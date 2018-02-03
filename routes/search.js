//  ===  REQUIRES  ======================================================================
var
    express = require("express"),
    router = express.Router(),
    request = require("request"),
    db = require("../models");

//  ===  MOVIE  =========================================================================
router.get("/", function (req, res) {
    var query = req.query.movieTitle;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&s=" + query;
    request(url, function (error, response, body) {
        // Error handling
        if (error) {
            console.log("Something happened! ", error);
            res.send(error);
        }
        // Take data: Error handling or render results
        else if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            // Error handling
            if (data.Response === "False") {
                var errorMessage = data.Error + " Please search again."
                req.flash("error", errorMessage);
                res.redirect("/");
            }
            // Render results
            else {
                res.render("search/results", { data: data });
            }
        }
    });
});

//  ===  EXPORTS  =======================================================================
module.exports = router;