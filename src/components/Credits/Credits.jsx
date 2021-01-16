import React from "react";
import creditImage from "../../images/attributionlogo.png";
import "./Credits.css";

const Credits = () => {
    return (
        <div class="credit-style">
            <img src={creditImage} />
            <h2>
                This product uses the TMDb API but is not endorsed or certified
                by TMDb.
            </h2>
        </div>
    );
};

export default Credits;
