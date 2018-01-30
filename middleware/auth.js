//  ===  VARIABLES  =====================================================================
var auth = {};

//  ===  IS USER LOGGED IN?  ============================================================
auth.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to login to add movies to your list.");
    res.redirect("/login");
}

//  ===  EXPORTS  =======================================================================
module.exports = auth;