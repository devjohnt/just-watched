//  ===  REQUIRES  ======================================================================
var
    mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

//  ===  SCHEMA  ========================================================================
var diarySchema = new mongoose.Schema({
    watchDate: {type: Date},
    isRewatched: {type: Boolean, default: false},
    movie: [{ type: Schema.Types.ObjectId, ref: 'Movie'}]
}, { usePushEach: true });

//  ===  EXPORTS  =======================================================================
module.exports = mongoose.model("Diary", diarySchema);