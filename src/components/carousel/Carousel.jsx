import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../Images/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.css";

const Carousel = ({ data, loading, endpoint, title }) => {
    // Ref for carousel container
    const carouselContainer = useRef();

    // Selector for accessing home state
    const { url } = useSelector((state) => state.home);

    // Hook for navigating between pages
    const navigate = useNavigate();

    // Function for carousel navigation
    const navigation = (dir) => {
        const container = carouselContainer.current;

        // Calculate scroll amount based on direction
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        // Smooth scroll to the calculated amount
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // Skeleton item for loading state
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    // JSX content for Carousel component
    return (
      <div className='carousel'>
        {" "}
        {/* Carousel container */}
        <ContentWrapper>
          {" "}
          {/* Content wrapper */}
          {title && <div className='carouselTitle'>{title}</div>}{" "}
          {/* Display carousel title if provided */}
          {/* Navigation arrows */}
          <BsFillArrowLeftCircleFill
            className='carouselLeftNav arrow'
            onClick={() => navigation("left")}
          />
          <BsFillArrowRightCircleFill
            className='carouselRighttNav arrow'
            onClick={() => navigation("right")}
          />
          {!loading ? ( // Render carousel items if not loading
            <div className='carouselItems' ref={carouselContainer}>
              {data?.map((item) => {
                // Map through data and render carousel items
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div
                    key={item.id}
                    className='carouselItem'
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }
                  >
                    <div className='posterBlock'>
                      <Img src={posterUrl} />
                      {/* Display CircleRating component */}
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                      {/* Display Genres component */}
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>
                    <div className='textBlock'>
                      {/* Display title */}
                      <span className='title'>{item.title || item.name}</span>
                      {/* Display formatted date */}
                      <span className='date'>
                        {dayjs(item.release_date || item.first_air_date).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='loadingSkeleton'>
              {" "}
              {/* Render loading skeleton */}
              {skItem()} {/* Render skeleton item */}
              {skItem()} {/* Render skeleton item */}
              {skItem()} {/* Render skeleton item */}
              {skItem()} {/* Render skeleton item */}
              {skItem()} {/* Render skeleton item */}
            </div>
          )}
        </ContentWrapper>
      </div>
    );
};

export default Carousel;
