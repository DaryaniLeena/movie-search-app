import React from "react";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../services/service";
import ButtonWatchList from "../WatchList/ButtonWatchList";
import { MOVIE_DB_IMAGE_URL } from "../../services/service";
import "./MovieDetail.css";

const MovieDetail = ({ movieid, uid }) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [error, setError] = useState("");
    const getDurationStr = (mins) => {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        m = m < 10 ? "0" + m : m;
        return `${h}h ${m}m`;
    };
    const getReleaseDateStr = (str) => {
        const date = new Date(str);
        return (
            date.getDate() +
            "." +
            (date.getMonth() + 1) +
            "." +
            date.getFullYear()
        );
    };
    const budgetStr = movieDetail.budget;
    const durationStr = getDurationStr(movieDetail.runtime);
    useEffect(() => {
        getMovieDetails(movieid)
            .then((data) => {
                setMovieDetail(data);
                setError("");
            })
            .catch((err) => setError(err.status_message));
    }, []);

    if (!movieDetail || movieDetail.id !== Number(movieid)) {
        return <div>Loading....</div>;
    }
    return (
        <div className="movie-detail-container">
            <div className="detail-container">
                <div className="movie-poster">
                    <img
                        src={`${
                            MOVIE_DB_IMAGE_URL.medium + movieDetail.poster_path
                        }`}
                        alt={movieDetail.title}
                        className="movie__img"
                    />
                </div>
                <div className="movie-all-details">
                    <div className="row-title">
                        <h2 className="moviedetail-title">
                            {movieDetail.title}
                        </h2>
                        <div className="rating-container">
                            {movieDetail.vote_average}
                        </div>
                    </div>
                    <div className="tagline">
                        <div>{movieDetail.tagline}</div>
                    </div>
                    <div className="movie__control">
                        <ButtonWatchList movieDetail={movieDetail} uid={uid} />
                    </div>
                    <p className="movie-overview">{movieDetail.overview}</p>

                    <div className="genre-conatiner">
                        <span>Genres:</span>
                        {movieDetail.genres.map((o) => (
                            <span className="genres-name" key={`g${o.id}`}>
                                {o.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="movie-all-details release-conatiner">
                    <div className="release-detail">
                        Release Date:
                        {getReleaseDateStr(movieDetail.release_date)}
                    </div>
                    <div className="release-detail">
                        Duration: {durationStr}
                    </div>
                    <div className="release-detail">Budget: ${budgetStr}</div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetail;
