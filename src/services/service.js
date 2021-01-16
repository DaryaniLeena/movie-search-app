export const MOVIE_DB_IMAGE_URL = {
    small: "https://image.tmdb.org/t/p/w185",
    medium: "https://image.tmdb.org/t/p/w300",
    large: "https://image.tmdb.org/t/p/w1280",
    original: "https://image.tmdb.org/t/p/original",
};
export const checkSession = () => {
    return fetch("/session", {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const createSession = ({ username }) => {
    return fetch("/session", {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const endSession = () => {
    return fetch("/session", {
        method: "DELETE",
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getSelectedTypeMovies = (movieType) => {
    let url =
        "https://api.themoviedb.org/3/movie/" +
        movieType +
        "?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response
                .json()
                .then((err) =>
                    Promise.reject({ error: "error-getting-movie" })
                );
        });
};

export const getAllGenres = () => {
    let url =
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getMovieDetails = (id) => {
    let url =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&page=1";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getUserWatchlist = (id) => {
    return fetch(`/watchlist/${id}`, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => {
            return Promise.reject({
                code: "network-error",
            });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const addMovietoWatchList = (movieDetail, id) => {
    return fetch(`/watchlist/${id}`, {
        method: "POST",
        body: JSON.stringify({
            movieDetail: movieDetail,
        }),
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() =>
            Promise.reject({
                error: "network-error",
            })
        )
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const removeMovieFromWatchlist = (userId, movieId) => {
    return fetch(`/watchlist/${userId}/${movieId}`, {
        method: "DELETE",
    })
        .catch(() => {
            return Promise.reject({
                code: "network-error",
            });
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};

export const getSearchedMovie = (query) => {
    let url =
        "https://api.themoviedb.org/3/search/movie?api_key=ea64de9bddd08b946b34a41ba227ce72&language=en-US&query=" +
        query +
        "&page=1&include_adult=false";
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "content-type": "application/json",
        }),
    })
        .catch(() => Promise.reject({ error: "network-error" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
};
