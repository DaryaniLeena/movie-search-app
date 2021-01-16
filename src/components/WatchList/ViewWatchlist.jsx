import React, { useState, useEffect, useRef, useCallback } from "react";
import { getUserWatchlist } from "../../services/service";
import Error from "../Error/Error";
import MovieItem from "../MovieItem/MovieItem";
import "./WatchList.css";
import ErrorMessages from "../Error/ErrorMessages";

const ViewWatchList = ({ props, uid }) => {
    const id = props.uid;
    const savedList = useRef([]);
    const [watchlist, setWatchlist] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getUserWatchlist(id)
            .then((data) => {
                if (data) {
                    savedList.current = data;
                    updatewatchlist(savedList.current.movies);
                    setMessage("");
                } else {
                    setMessage("You dont have movies in your watchlist");
                }
            })
            .catch((err) => setMessage(ErrorMessages[err.error]));
    }, []);

    const updatewatchlist = useCallback((obj) => {
        setWatchlist(
            obj.map((element) => (
                <MovieItem
                    key={element.id}
                    props={{ element }}
                    uid={id}
                    withWatchListButton
                    updatewatchlist={updatewatchlist}
                    watchlist={watchlist}
                />
            ))
        );
    });
    return (
        <div>
            <div className="watchlist-title">MY WATCHLIST</div>
            <div>
                {watchlist == "" ? (
                    <div className="error-mess">
                        <Error message="You dont have movies in your watchlist" />
                    </div>
                ) : (
                    <div className="movie-container">{watchlist}</div>
                )}
            </div>
        </div>
    );
};

export default ViewWatchList;
