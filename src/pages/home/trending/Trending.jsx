import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  // State variable to track the selected time window (day or week)
  const [endpoint, setEndpoint] = useState("day");

  // Fetching trending data based on the selected time window
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  // Function to handle tab change (day or week)
  const onTabChange = (selectedOption) => {
      setEndpoint(selectedOption); // Updates the selected time window
  };

  // Rendering the Trending component
  return (
      <div className='carouselSection'>
          {/* Wrapper for content */}
          <ContentWrapper>
              {/* Title */}
              <span className='carouselTitle'>Trending</span>
              {/* Dropdown to select time window */}
              <select
                  style={{
                      fontSize: "16px",
                      padding: "6px",
                      borderRadius: "14px",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                  }}
                  value={endpoint} // Selected time window value
                  onChange={(e) => onTabChange(e.target.value)} // Event handler for change
              >
                  <option value='day'>Day</option>
                  <option value='week'>Week</option>
              </select>
          </ContentWrapper>
          {/* Carousel component to display data */}
          <Carousel data={data?.results} loading={loading} />
      </div>
  );
};

export default Trending;
