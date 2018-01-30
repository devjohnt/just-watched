//  ===  REQUIRES  ======================================================================
var
	express	 = require("express"),
	router   = express.Router();

//  ===  ROOT   =========================================================================
router.get("/", function(req, res) {
	res.render("landing");
});

//  ===  UNDEFINED  =====================================================================
router.get("*", function(req, res) {
	res.send("No defined route, mate!");
});

//  ===  EXPORTS  =======================================================================
module.exports = router;