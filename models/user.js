//  =====================================================================================
//  ===  USER MODEL  ====================================================================
//  =====================================================================================

//  ===  KICKOFF  =======================================================================
var
	mongoose              = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

//  ===  SCHEMA  ========================================================================
var userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String }
});

//  ===  PLUGIN UTILAZATION  ============================================================
userSchema.plugin(passportLocalMongoose, { usernameLowerCase: true });

// //  ===  SETTER FUNCTIONS  ==============================================================
// function toLower(username) {
// 	return username.toLowerCase();
// }

//  ===  EXPORT  ========================================================================
module.exports = mongoose.model("User", userSchema);