import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getSelectedTypeMovies } from "../../services/service";
import MovieItem from "../MovieItem/MovieItem";

const SelectedTypeMovies = ({ movieType, uid }) => {
    const movie = useRef([]);
    const [MovieList, setMovieList] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        getSelectedTypeMovies(movieType)
            .then((data) => {
                movie.current = data;
                setMovieData(movie.current.results);
                setError("");
            })
            .catch((err) => setError(err.status_message));
    }, [movieType]);

    const setMovieData = useCallback((obj) => {
        setMovieList(
            obj.map((element) => (
                <MovieItem key={element.id} props={{ element }} uid={uid} />
            ))
        );
    });

    return <div className="movie-container">{MovieList}</div>;
};
export default SelectedTypeMovies;
