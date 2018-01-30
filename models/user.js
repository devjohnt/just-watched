//  ===  REQUIRES  ======================================================================
var
	mongoose              = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Diary                 = require("./diary");

//  ===  SCHEMA  ========================================================================
var userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	email: { type: String },
	diary: [Diary.schema]
}, { usePushEach: true });

//  ===  PLUGINS  =======================================================================
userSchema.plugin(passportLocalMongoose, { usernameLowerCase: true });

//  ===  EXPORTS  ========================================================================
module.exports = mongoose.model("User", userSchema);