RESTful Routes

ROOT ROUTE
Name              Route             Verb     Purpose                               Methods     Status
Landing Page      /                 GET      Show landing page                     N/A         Added


AUTHENTICATION ROUTES
Name          Route             Verb     Purpose                               Methods                    Status
Sign Up Form  /register         GET      Show sign-up form                     N/A                        Added
Sign Up Logic /register         POST     Handle sign-up logic                  User.register()            Added
Login Form    /login            GET      Show login form                       N/A                        Added
Login Logic   /login            POST     Handle login logic                    passport.authenticate()    Added
Logout        /logout           GET      Logout current user                   req.logout()               Added


USER ROUTES (yet to come...)
Name          Route             Verb     Purpose                               Methods                    Status
Index         /users            GET      List all users                        User.find()                Added
Show          /users/:id        GET      Show info about specific user         User.findById()            Not Added
Edit          /users/:id/edit   GET      Show edit form for one user           User.findById()            Not Added
Update        /users/:id        PUT      Update particular User; redirect      User.findByIdAndUpdate()   Not Added
Destroy       /users/:id        DELETE   Delete particular User; redirect      User.findByIdAndRemove()   Not Added


SEARCH ROUTES
Name          Route             Verb     Purpose                               Methods   Status
Search Movie  /search           GET      Search movies from OMDb API           N/A       Added


MOVIE ROUTES
Name          Route              Verb     Purpose                              Methods           Status
Index         /movies            GET      List all movies                      Movie.find()      Added
Create        /movies            POST     Create a new movie; redirect         Movie.create()    Added
Show          /movies/:id        GET      Show info about specific movie       N/A               Added


DIARY ROUTES
Name          Route                       Verb     Purpose                              Methods            Status
Index         /:username/diary            GET      List all movies in the diary         Diary.find()       Added
New           /:username/diary/new        GET      Show new diary entry form            N/A                Added
Create        /:username/diary            POST     Add a new diary entry                Diary.create()     Not Added
Edit          /:username/diary/:id/edit   GET      Show edit form for one diary entry   Diary.findById()   Not Added
Update        /:username/diary/:id        PUT      Update particular diary entry        Diary.findByIdAndUpdate() NA
Destroy       /:username/diary/:id        DELETE   Delete particular diary entry        Diary.findByIdAndRemove() NA




GUIDELINE
Name              Route             Verb     Purpose                               Methods
Index             /users            GET      List all users                        User.find()
New               /users/new        GET      Show new user form                    N/A
Create            /users            POST     Create a new user; redirect           User.create()
Show              /users/:id        GET      Show info about specific user         User.findById()
Edit              /users/:id/edit   GET      Show edit form for one user           User.findById()
Update            /users/:id        PUT      Update particular User; redirect      User.findByIdAndUpdate()
Destroy           /users/:id        DELETE   Delete particular User; redirect      User.findByIdAndRemove()