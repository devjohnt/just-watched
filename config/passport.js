//  =====================================================
//  KICK-OFF  ===========================================
//  =====================================================
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User     = require("../models/user");

module.exports = function(passport) {

    //  =====================================================
    //  SESSION SETUP  ======================================
    //  =====================================================
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //  =====================================================
    //  LOCAL SIGN-UP  ======================================
    //  =====================================================
    passport.use(new LocalStrategy(User.authenticate()));
}
