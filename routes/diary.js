//  ===  REQUIRES  ======================================================================
var
	express = require("express"),
	router = express.Router(),
	request = require("request"),
	db = require("../models/");
	

//  ===  INDEX - LIST ALL MOVIES IN THE DIARY  ==========================================
router.get("/", function (req, res) {
	db.User
		.findOne({'username': req.user.username})
		.populate('diary.movie')
		.exec(function (err, user) {
			// Error handling
			if (err) {
				console.log(err);
			}
			// Send found user info
			else {
				// res.send(user);
				res.render("diary/index", {movies: user.diary});
			}
		});
	// res.render("diary/index");
});

//  ===  NEW - SHOW NEW DIARY ENTRY FORM  ===============================================
router.get("/new", function(req, res) {
	var imdbID = req.query.imdbID;
	var movieId = req.query.movieId;
	var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
	request(url, function (error, response, body) {
		if(error) {
			console.log("Something happened! ", error);
		} else if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("diary/new", { data: data, movieId: movieId });
		}
	});
});

//  ===  CREATE - ADD NEW DAIRY ENTRY  ==================================================
router.post("/", function(req, res) {    
	var diaryEntry = new db.Diary({
		watchDate: req.body.date,
		movie: [],
	});
	diaryEntry.movie.push(req.body.movieId);
	db.User.findOne({'username': req.user.username}, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			user.diary.push(diaryEntry);
			user.save(function (err, user) {
				if (err) {
					console.log(err);
				} else {
					res.redirect("/users/:username/diary");
				}
			});
		}        
	});
});

//  ===  EDIT - SHOW EDIT FORM FOR ONE DIARY ENTRY  =====================================
router.get("/:id/edit", function(req, res) {
	var imdbID = req.query.imdbID;
	var diaryID = req.params.id;
	var url = "http://www.omdbapi.com/?apikey=3b7193fb&i=" + imdbID;
	request(url, function (error, response, body) {
		if (error) {
			console.log("Something happened! ", error);
			req.flash("error", error);
			res.redirect("/users/" + req.user.username + "/diary");
		}
		else if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("diary/edit", {data: data, diaryID: diaryID});
		}
	});
});

//  ===  UPDATE - UPDATE PARTICULAR DIARY ENTRY  ========================================
router.put("/:id", function(req, res) {
	var diaryID = req.params.id;
	db.User.diary.id(diaryID).exec(function(err, diary) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(diary);
				res.send(diary);
			}			
		});
});

//  ===  EXPORTS  =======================================================================
module.exports = router;