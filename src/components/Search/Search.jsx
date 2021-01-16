import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { getSearchedMovie } from "../../services/service";
import MovieItem from "../MovieItem/MovieItem";
import "./Search.css";

const Search = ({ query, uid }) => {
    const [MovieList, setMovieList] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        getSearchedMovie(query)
            .then((data) => {
                setMovieData(data.results);
                setError("");
            })
            .catch((err) => setError(err.status_message));
    }, [query]);

    const setMovieData = useCallback((obj) => {
        setMovieList(
            obj.map((element) => (
                <MovieItem key={element.id} props={{ element }} uid={uid} />
            ))
        );
    });

    return (
        <div>
            <div className="search-query">Search results "{query}"</div>
            <div className="movie-container">{MovieList}</div>
        </div>
    );
};
export default Search;
