//  ===  CREATE JS OBJ FROM JSON  =======================================================
var
    Movie = require("../models/movie"),
    movies = {};

movies.jsonToObj = function jsonToObj(json) {
    var obj = new Movie({
        Title: json.Title,
        Year: json.Year,
        Rated: json.Rated,
        Released: json.Released,
        Runtime: json.Runtime,
        Genre: json.Genre,
        Director: json.Director,
        Writer: json.Writer,
        Actors: json.Actors,
        Plot: json.Plot,
        Language: json.Language,
        Country: json.Country,
        Awards: json.Awards,
        Poster: json.Poster,
        Ratings: json.Ratings,
        Metascore: json.Metascore,
        imdbRating: json.imdbRating,
        imdbVotes: json.imdbVotes,
        imdbID: json.imdbID,
        Type: json.Type,
        DVD: json.DVD,
        BoxOffice: json.BoxOffice,
        Production: json.Production,
        Website: json.Website
    });
    return obj;
}

module.exports = movies;