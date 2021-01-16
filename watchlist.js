let usersWatchlist = {
    "5f27b7db-8a29-4a2e-8c5d-79761cf7cccd": {
        movies: [],
    },
    "5f27b7db-8a29-4a2e-8c5d-79761cf7ccab": {
        movies: [],
    },
};

const removeMovie = (movieId, userid) => {
    usersWatchlist[userid].movies.splice(
        usersWatchlist[userid].movies.findIndex(function (item) {
            return item.id === Number(movieId);
        }),
        1
    );
};
const addMovie = (movieDetail, userid) => {
    if (usersWatchlist[userid]) {
        usersWatchlist[userid].movies.push(movieDetail);
    } else {
        usersWatchlist[userid] = {
            movies: [movieDetail],
        };
    }
};

module.exports = {
    usersWatchlist,
    removeMovie,
    addMovie,
};
