import React from "react";
import { NavLink } from "react-router-dom";
import "./MovieNav.css";

const MovieNav = () => {
    return (
        <ul class="navigation">
            <li>
                <NavLink activeClassName="selected" to="/movies">
                    Popular
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="selected" to="/topRatedMovie">
                    Top Rated
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="selected" to="/nowPlayingMovie">
                    Now Playing
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="selected" to="/upcomingMovie">
                    Upcoming
                </NavLink>
            </li>
        </ul>
    );
};

export default MovieNav;
