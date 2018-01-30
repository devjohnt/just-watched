//  ===  REQUIRES  ======================================================================
var
    Movie = require("../models/movie"),
    movies = {};

//  ===  CREATE JS OBJ FROM JSON  =======================================================
movies.jsonToObj = function jsonToObj(json) {
    var obj = new Movie({
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

//  ===  EXPORTS  =======================================================================
module.exports = movies;