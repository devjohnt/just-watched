//  =====================================================================================
//  ===  AUTHENTICATION ROUTES  =========================================================
//  =====================================================================================
var
    express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//  ===  SIGN-UP  =======================================================================
router.get("/register", function (req, res) {
    res.render("auth/register");
});

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            console.log("New user has registered. User is: ", user);
            res.redirect("/users");
        })
    });
});

//  ===  LOGIN  =========================================================================
router.get("/login", function (req, res) {
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/users/",
    failureRedirect: "/login/",
}));

//  ===  LOGOUT  ========================================================================
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

//  ===  SHOW USERS  ====================================================================
router.get("/users", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log("Error mate! ", err)
        } else {
            res.render("users/users", { users: users, currentUser: req.user });
        };
    });
});

module.exports = router;