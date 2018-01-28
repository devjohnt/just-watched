RESTful Routes

ROOT ROUTE
Name              Route             Verb     Purpose                               DB-Action
Landing Page      /                 GET      Show landing page                     N/A


AUTHENTICATION ROUTES
Name              Route             Verb     Purpose                               DB-Action
Sign Up Form      /register         GET      Show sign-up form                     N/A
Sign Up Logic     /register         POST     Handle sign-up logic                  User.register()
Login Form        /login            GET      Show login form                       N/A
Login Logic       /login            POST     Handle login logic                    passport.authenticate()
Logout            /logout           GET      Logout current user                   req.logout()


USER ROUTES (yet to come...)
Name              Route             Verb     Purpose                               DB-Action
Index             /users            GET      List all users                        User.find()
Show              /users/:id        GET      Show info about specific user         User.findById()
Edit              /users/:id/edit   GET      Show edit form for one user           User.findById()
Update            /users/:id        PUT      Update particular User; redirect      User.findByIdAndUpdate()
Destroy           /users/:id        DELETE   Delete particular User; redirect      User.findByIdAndRemove()


SEARCH ROUTES
Name              Route             Verb     Purpose                               DB-Action
Search Movie      /search           GET      Search movies from OMDb API           N/A


MOVIE ROUTES
Name              Route              Verb     Purpose                              DB-Action
Index             /movies            GET      List all movie                       Movie.find()
New               /movies/new        GET      Show new movie form                  N/A
Create            /movies            POST     Create a new movie; redirect         Movie.create()
Show              /movies/:id        GET      Show info about specific movie       Movie.findById()
Edit              /movies/:id/edit   GET      Show edit form for one movie         Movie.findById()
Update            /movies/:id        PUT      Update particular Movie; redirect    Movie.findByIdAndUpdate()
Destroy           /movies/:id        DELETE   Delete particular Movie; redirect    Movie.findByIdAndRemove()





GUIDELINE
Name              Route             Verb     Purpose                               DB-Action
Index             /users            GET      List all users                        User.find()
New               /users/new        GET      Show new user form                    N/A
Create            /users            POST     Create a new user; redirect           User.create()
Show              /users/:id        GET      Show info about specific user         User.findById()
Edit              /users/:id/edit   GET      Show edit form for one user           User.findById()
Update            /users/:id        PUT      Update particular User; redirect      User.findByIdAndUpdate()
Destroy           /users/:id        DELETE   Delete particular User; redirect      User.findByIdAndRemove()