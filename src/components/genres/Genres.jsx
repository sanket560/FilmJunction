import React from "react";
import { useSelector } from "react-redux";

import "./style.css";

// Genres component
const Genres = ({ data }) => {
  // Selector for accessing genres from the home state
  const { genres } = useSelector((state) => state.home);

  // JSX content for Genres component
  return (
    <div className='genres'>
      {" "}
      {/* Container for genres */}
      {data?.map((g) => {
        // Map through data array
        if (!genres[g]?.name) return; // If genre name doesn't exist, return null
        return (
          <div key={g} className='genre'>
            {" "}
            {/* Individual genre */}
            {genres[g]?.name} {/* Display genre name */}
          </div>
        );
      })}
    </div>
  );
};

export default Genres; // Export Genres component

