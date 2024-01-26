import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../Images/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  // Define state variables for controlling video popup visibility and video ID
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // Extract mediaType and id from URL parameters using the useParams hook
  const { mediaType, id } = useParams();

  // Fetch data based on mediaType and id using the useFetch hook
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  // Extract the 'url' from the Redux store using the useSelector hook
  const { url } = useSelector((state) => state.home);

  // Extract an array of genre IDs from the fetched data, if available
  const _genres = data?.genres?.map((g) => g.id);

  // Filter the 'crew' data to get directors and writers based on their respective jobs
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  // Define a utility function that converts total minutes to hours and minutes format
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className='detailsBanner'>
      {/* Check if data is not loading */}
      {!loading ? (
        <>
          {/* Check if data exists */}
          {!!data && (
            <React.Fragment>
              <div className='backdrop-img'>
                {/* Display backdrop image */}
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className='opacity-layer'></div>
              <ContentWrapper>
                <div className='content'>
                  <div className='left'>
                    {/* Display poster image if available, otherwise display fallback image */}
                    {data.poster_path ? (
                      <Img
                        className='posterImg'
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className='posterImg' src={PosterFallback} />
                    )}
                  </div>
                  <div className='right'>
                    {/* Display title with release year */}
                    <div className='title'>{`${
                      data.name || data.title
                    } (${dayjs(data?.release_date).format("YYYY")})`}</div>
                    {/* Display tagline */}
                    <div className='subtitle'>{data.tagline}</div>

                    {/* Display genres */}
                    <Genres data={_genres} />

                    <div className='row'>
                      {/* Display rating */}
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      {/* Display play button to watch trailer */}
                      <div
                        className='playbtn'
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className='text'>Watch Trailer</span>
                      </div>
                    </div>

                    {/* Display overview */}
                    <div className='overview'>
                      <div className='heading'>Overview</div>
                      <div className='description'>{data.overview}</div>
                    </div>

                    <div className='info'>
                      {/* Display status */}
                      {data.status && (
                        <div className='infoItem'>
                          <span className='text bold'>Status: </span>
                          <span className='text'>{data.status}</span>
                        </div>
                      )}
                      {/* Display release date */}
                      {data.release_date && (
                        <div className='infoItem'>
                          <span className='text bold'>Release Date: </span>
                          <span className='text'>
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {/* Display runtime */}
                      {data.runtime && (
                        <div className='infoItem'>
                          <span className='text bold'>Runtime: </span>
                          <span className='text'>
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Display directors */}
                    {director?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Director: </span>
                        <span className='text'>
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* Display writers */}
                    {writer?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Writer: </span>
                        <span className='text'>
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* Display creators */}
                    {data?.created_by?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>Creator: </span>
                        <span className='text'>
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Render video popup component */}
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        // Render skeleton loader while data is loading
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right'>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
