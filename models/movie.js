//  ===  REQUIRES  ======================================================================
var
    mongoose = require("mongoose");

//  ===  SCHEMA  ========================================================================
var movieSchema = new mongoose.Schema({
	Title: { type: String },
	Year: { type: String },
	Released: { type: String },
	Runtime: { type: String },
	imdbID: { type: String },
	Type: { type: String },
	Poster: { type: String },
	Plot: { type: String },
	Ratings: [
		{
			Source: { type: String },
			Value: { type: String }
		}
	],
}, { usePushEach: true });

//  ===  EXPORTS  =======================================================================
module.exports = mongoose.model("Movie", movieSchema);