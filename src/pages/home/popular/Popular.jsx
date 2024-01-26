import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    // State variable to track the selected endpoint (movie or tv)
    const [endpoint, setEndpoint] = useState("movie");

    // Fetching data based on the selected endpoint
    const { data, loading } = useFetch(`/${endpoint}/popular`);

    // Function to handle tab change (movie or tv)
    const onTabChange = (selectedOption) => {
        setEndpoint(selectedOption); // Updates the selected endpoint
    };

    // Rendering the Popular component
    return (
        <div className="carouselSection">
            {/* Wrapper for content */}
            <ContentWrapper>
                {/* Title */}
                <span className="carouselTitle">What's Popular</span>
                {/* Dropdown to select endpoint */}
                <select 
                    style={{
                        "fontSize" : "16px",
                        "padding" : "6px",
                        "borderRadius":"14px" ,
                        "outline":"none",
                        "border" : "none" ,
                        "cursor": "pointer"
                    }} 
                    value={endpoint} // Selected endpoint value
                    onChange={(e) => onTabChange(e.target.value)} // Event handler for change
                >
                    <option value="movie">Movie</option>
                    <option value="tv">Tv</option>
                </select>
            </ContentWrapper>
            {/* Carousel component to display data */}
            <Carousel
                data={data?.results} // Data to display in the carousel
                loading={loading} // Loading state
                endpoint={endpoint} // Current endpoint (movie or tv)
            />
        </div>
    );
};

export default Popular;