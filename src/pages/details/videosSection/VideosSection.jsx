import React, { useState } from "react";

import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
    // State variables
    const [show, setShow] = useState(false); // Determines if video popup is shown
    const [videoId, setVideoId] = useState(null); // Holds the ID of the video to display

    // Function to render loading skeleton
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    // Rendering the VideosSection component
    return (
        <div className="videosSection">
            {/* Wrapper for content */}
            <ContentWrapper>
                {/* Section heading */}
                <div className="sectionHeading">Official Videos</div>
                {/* Render videos if not loading */}
                {!loading ? (
                    <div className="videos">
                        {/* Map through video data and render each video item */}
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    // Set video ID and show video popup on click
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                {/* Video thumbnail */}
                                <div className="videoThumbnail">
                                    {/* Render video thumbnail image */}
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    {/* Render play icon */}
                                    <PlayIcon />
                                </div>
                                {/* Video title */}
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Render loading skeleton if loading */
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            {/* Video popup component */}
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;