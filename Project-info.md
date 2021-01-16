MOVIE BROWSING APPLICATION

This application can be used to browse movies of multiple Genres.
Users can view the Popular, Top Rated, Now Playing, and Upcoming Movies.
Users can read movie descriptions, can get information about the movie like release date, budget, Rating, Movie description, etc.
Users can search for a movie with the movie title. The app will show all the movies having the title mentioned in the search field.
Users can Watchlist a movie which is like marking a movie as a favorite. This creates a watchlist to keep track of movies to be watched in the future.
User can also remove the movie from Watchlist (Use case: Once saw the movie or not interested anymore in watching the movie)
A user needs to login to watchlist a movie or to view a watchlist. This service is only for logged-in users.
A user can only see different movies and their details without a login-in.

API Used:
I have used The Movie Database API i.e. https://developers.themoviedb.org/3 to fetch the movies(Popular/ Now Playing / Top Rated /Upcoming ), movie description, Search Movies, Get Genres for a movie, etc.
I have also written services for user login, logout, to get logged in user watchlist, to add a movie to the watchlist, and to delete a movie from the watch list.
For user login values including 'dog' and spaces are not allowed. The app will throw a bad-login error.
If the user is not logged in, the app will not allow the user to add a movie to the watch list and will throw the error "login to add movie to the watchlist"
Users cannot add the same movie multiple times and if the user tries to do so, the app will throw the error "movie already in the watchlist".

To Run The App:
npm install
npm start
The app will run on localhost:5000

References:
The images related to all movies inside the application are from The Movie Database API.
The background image of the project is taken from unsplash.com https://unsplash.com/photos/evlkOfkQ5rE
