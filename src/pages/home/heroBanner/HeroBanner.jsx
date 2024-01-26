import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.css";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    // State variables
    const [background, setBackground] = useState(""); // Holds URL for background image
    const [query, setQuery] = useState(""); // Holds search query
    const navigate = useNavigate(); // Navigation hook
    const { url } = useSelector((state) => state.home); // Selects URL from Redux store
    const { data, loading } = useFetch("/movie/upcoming"); // Fetches upcoming movies data

    // Effect to update background image when data changes
    useEffect(() => {
        // Constructs background image URL using fetched data
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg); // Sets background image URL
    }, [data]);

    // Handler for search query input
    const searchQueryHandler = (event) => {
        // Navigates to search page when Enter key is pressed and query is not empty
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    // Handler for search button click
    const searchButtonClickHandler = () => {
        // Navigates to search page when search button is clicked and query is not empty
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    // Rendering the HeroBanner component
    return (
        <div className="heroBanner">
            {/* Render background image when data is not loading */}
            {!loading && (
                <div className="backdrop-img">
                    {/* Render image component */}
                    <Img src={background} />
                </div>
            )}

            {/* Overlay for background image */}
            <div className="opacity-layer"></div>

            {/* Content within the hero banner */}
            <ContentWrapper>
                <div className="heroBannerContent">
                    {/* Title */}
                    <span className="title">Welcome.</span>
                    {/* Subtitle */}
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    {/* Search input */}
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            value={query} // Controlled input value
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        {/* Search button */}
                        <button onClick={searchButtonClickHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
