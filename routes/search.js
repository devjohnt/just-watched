//  =====================================================================================
//  ===  SEARCH ROUTES  =================================================================
//  =====================================================================================
var
    express = require("express"),
    router = express.Router(),
    request = require("request");

//  ===  MOVIE  =========================================================================
router.get("/", function (req, res) {
    var query = req.query.movieTitle;
    var url = "http://www.omdbapi.com/?apikey=3b7193fb&s=" + query;
    request(url, function (error, response, body) {
        if (error) {
            console.log("Something happened! ", error);
        } else if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("search/results", { data: data });
        }
    });
});

module.exports = router;