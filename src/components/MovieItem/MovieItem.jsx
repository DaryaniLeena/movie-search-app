import React, { useState, useEffect } from "react";
import "./MovieItem.css";
import { getAllGenres } from "../../services/service";
import { MOVIE_DB_IMAGE_URL } from "../../services/service";
import { Link } from "react-router-dom";
import noPhoto from "./noimage.png";
import {
    getUserWatchlist,
    removeMovieFromWatchlist,
} from "../../services/service";
import ErrorMessages from "../Error/ErrorMessages";

const MovieItem = ({
    props,
    uid,
    withWatchListButton,
    watchlist,
    updatewatchlist,
}) => {
    const { title, vote_average, poster_path, id } = props.element;
    const [genre, setGenre] = useState([]);
    const [error, setError] = useState("");
    let { genre_ids } = props.element;

    useEffect(() => {
        getAllGenres()
            .then((data) => {
                setGenre(data.genres);
                setError("");
            })
            .catch((err) => setError(err.status_message));
    }, []);

    let genresStr = "";
    if (genre_ids) {
        genresStr = genre_ids
            .map((id) => {
                const item = genre.find((item) => item.id === id);
                return item ? item.name : null;
            })
            .join(", ");
    }

    const removeFromWatchlist = () => {
        console.log(uid);
        removeMovieFromWatchlist(uid, id)
            .then((response) => {
                setError("");
            })
            .catch(function (err) {
                setError(ErrorMessages[err.error]);
            });

        getUserWatchlist(uid)
            .then((obj) => {
                if (obj) {
                    watchlist.current = obj;
                    updatewatchlist(watchlist.current.movies);
                    setError("");
                } else {
                    setError("No data in watchlist");
                }
            })
            .catch((err) => setError(err.error));
    };

    return (
        <div key={id} className="cardStyle">
            <Link to={`/movies/${id}`}>
                <img
                    className="imgHeight"
                    src={
                        poster_path
                            ? MOVIE_DB_IMAGE_URL.medium + poster_path
                            : noPhoto
                    }
                    alt={title}
                ></img>
            </Link>
            <div className="movie-detail">
                <div className="title-style">{title}</div>
                <div className="rating-style"> {vote_average}</div>
                <div>{genresStr}</div>
                {withWatchListButton && (
                    <button
                        className="remove-watchlist"
                        onClick={removeFromWatchlist}
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieItem;
