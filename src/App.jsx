import "./App.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import SelectedTypeMovies from "./components/Movies/SelectedTypeMovies";
import MovieNav from "./components/MovieNavigation/MovieNav";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import logo from "./images/reactLogo.png";
import { endSession } from "./services/service";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ViewWatchList from "./components/WatchList/ViewWatchlist";
import Searchform from "./components/Search/Searchform";
import Search from "./components/Search/Search";
import ErrorMessages from "./components/Error/ErrorMessages";
import Credits from "./components/Credits/Credits";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");

    const login = function ({ username, uid }) {
        setIsLoggedIn(true);
        setCurrentUser(uid);
    };
    const logoutLoggedinUser = function () {
        endSession()
            .then(() => {
                setIsLoggedIn(false);
                setCurrentUser("");
            })
            .catch((err) => {
                setError(ErrorMessages[err.error]);
            });
    };

    const makeStatusLoggedIn = function (loggedIn) {
        setIsLoggedIn(loggedIn);
    };

    if (isLoggedIn) {
        return (
            <div>
                <header className="header-style">
                    <span className="logoSearch">
                        <span>
                            <img src={logo} className="logoStyle" alt="xyz" />
                        </span>
                        <span>
                            <Searchform className="search-input"></Searchform>
                        </span>
                    </span>
                    <span className="movieLogin">
                        <nav>
                            <NavLink className="nav-tab" to="/credits">
                                Credits
                            </NavLink>
                            <NavLink className="nav-tab" to="/wishlist">
                                My Watchlist
                            </NavLink>
                            <NavLink className="nav-tab" to="/movies">
                                Movie
                            </NavLink>
                            <NavLink className="nav-tab" to="/logout">
                                Logout
                            </NavLink>
                        </nav>
                    </span>
                </header>
                <div>
                    <MovieNav></MovieNav>
                </div>
                <div>
                    <Switch>
                        <Route path="/credits" component={Credits} />
                        <Route
                            path="/topRatedMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="top_rated"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="now_playing"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="upcoming"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/movies/:movieid"
                            render={(routerProps) => {
                                const movieid =
                                    routerProps.match.params.movieid;
                                console.log(movieid);
                                return (
                                    <MovieDetail
                                        {...routerProps}
                                        movieid={movieid}
                                        uid={currentUser}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="popular"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/search/:query"
                            render={(routerProps) => {
                                const query = routerProps.match.params.query;

                                return (
                                    <Search
                                        {...routerProps}
                                        query={query}
                                        uid={currentUser}
                                        className="search-input"
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/wishlist"
                            render={(props) => (
                                <ViewWatchList
                                    {...props}
                                    props={{
                                        uid: currentUser,
                                    }}
                                />
                            )}
                        />
                        <Route
                            path="/logout"
                            render={(props) => (
                                <Logout
                                    {...props}
                                    props={{
                                        performLogout: logoutLoggedinUser,
                                    }}
                                />
                            )}
                        />

                        <Redirect
                            from="/"
                            exact
                            to="/movies"
                            component={SelectedTypeMovies}
                        />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <header className="header-style">
                    <span className="logoSearch">
                        <span>
                            <img src={logo} className="logoStyle" alt="xyz" />
                        </span>
                        <span>
                            <Searchform className="search-input"></Searchform>
                        </span>
                    </span>
                    <span className="movieLogin">
                        <nav>
                            <NavLink className="nav-tab" to="/credits">
                                Credits
                            </NavLink>
                            <NavLink className="nav-tab" to="/movies">
                                Movie
                            </NavLink>
                            <NavLink className="nav-tab" to="/login">
                                Login
                            </NavLink>
                        </nav>
                    </span>
                </header>
                <div>
                    <MovieNav></MovieNav>
                </div>
                <div>
                    <Switch>
                        <Route path="/credits" component={Credits} />
                        <Route
                            path="/topRatedMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="top_rated"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="now_playing"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="upcoming"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/movies/:movieid"
                            render={(routerProps) => {
                                const movieid =
                                    routerProps.match.params.movieid;
                                console.log(movieid);
                                return (
                                    <MovieDetail
                                        {...routerProps}
                                        movieid={movieid}
                                        uid={currentUser}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <SelectedTypeMovies
                                    {...props}
                                    movieType="popular"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/search/:query"
                            render={(routerProps) => {
                                const query = routerProps.match.params.query;

                                return (
                                    <Search
                                        {...routerProps}
                                        query={query}
                                        uid={currentUser}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login
                                    {...props}
                                    props={{
                                        onLogin: login,
                                        makeStatusLoggedIn: makeStatusLoggedIn,
                                    }}
                                />
                            )}
                        />
                        <Redirect
                            from="/"
                            exact
                            to="/movies"
                            component={SelectedTypeMovies}
                        />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
