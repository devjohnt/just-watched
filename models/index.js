//  ===  REQUIRES  ======================================================================
var mongoose = require("mongoose"),
    url = "mongodb://localhost:27017/just_watched_v00",
    options = { useMongoClient: true };

//  ===  CONFIGURE AND CONNECT TO DB  ===================================================
mongoose.connect(url, options);        //Connect DB
mongoose.Promise = global.Promise;     //Get Mongoose to use the global promise library
mongoose.set('debug', true);           //Debug mode is open for mongoose

//  ===  MODELS REQUIRE  ================================================================
exports.User = require("./user");
exports.Movie = require("./movie");
exports.Diary = require("./diary");

//  ===  EXPORTS  =======================================================================
module.exports = exports;