import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";

function Searchform() {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const query = e.target.value;

        setSearchTerm(query);
        if (query.length >= 2) {
            history.push(`/search/${query}`);
        } else if (query.length === 0) {
            history.push(`/`);
        }
    };

    return (
        <input
            type="text"
            placeholder="Search by movie title"
            onChange={handleChange}
            value={searchTerm}
            className="search-input"
        />
    );
}
export default Searchform;
