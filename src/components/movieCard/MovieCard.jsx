import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.css";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../Images/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  // Selector for accessing URL from the home state
  const { url } = useSelector((state) => state.home);

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Constructing poster URL
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  // JSX content for MovieCard component
  return (
    <div
      className='movieCard' // Container for movie card
      onClick={
        () => navigate(`/${data.media_type || mediaType}/${data.id}`) // Navigate to details page on click
      }
    >
      <div className='posterBlock'>
        {" "}
        {/* Poster block */}
        <Img className='posterImg' src={posterUrl} /> {/* Poster image */}
        {!fromSearch && ( // If not from search results, display rating and genres
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />{" "}
            {/* Circle rating component */}
            <Genres data={data.genre_ids.slice(0, 2)} />{" "}
            {/* Genres component */}
          </React.Fragment>
        )}
      </div>
      <div className='textBlock'>
        {" "}
        {/* Text block */}
        <span className='title'>{data.title || data.name}</span> {/* Title */}
        <span className='date'>
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>{" "}
        {/* Release date */}
      </div>
    </div>
  );
};

export default MovieCard;
