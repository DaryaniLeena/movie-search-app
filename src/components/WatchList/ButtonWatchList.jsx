import { useState, useEffect } from "react";
import { getUserWatchlist, addMovietoWatchList } from "../../services/service";
const ButtonWatchList = function ({ movieDetail, uid }) {
    const [presentInwatchlist, setpresentInwatchlist] = useState(false);
    const [watchList, setWatchList] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (uid) {
            getUserWatchlist(uid)
                .then((obj) => {
                    setWatchList(obj.movies);
                    if (
                        uid &&
                        watchList.some(
                            (movie) => movie["id"] === movieDetail.id
                        )
                    ) {
                        setpresentInwatchlist(true);
                    }
                })
                .catch((err) => {
                    setpresentInwatchlist(false);
                });
        }
    }, [movieDetail]);

    const addToWatchlist = () => {
        let index = watchList.findIndex(function (item) {
            return item.id == movieDetail.id;
        });
        if (uid == "") {
            setError("Please sign in to add movie to watchlist");
        } else if (index > -1) {
            setError("Movie already present in watchlist");
        } else {
            addMovietoWatchList(movieDetail, uid)
                .then((response) => {
                    setpresentInwatchlist(true);
                    setError("");
                })
                .catch(function (err) {
                    setError("error in adding movie to watchlist");
                });
        }
    };

    return (
        <div>
            <button
                disabled={presentInwatchlist}
                className="watchlistButton"
                onClick={addToWatchlist}
                id="watchlist-btn"
            >
                Add To my watchlist
            </button>
            <div className="watchlist-error">{error}</div>
        </div>
    );
};
export default ButtonWatchList;
