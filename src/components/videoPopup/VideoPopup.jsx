import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.css";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  // Function to hide the popup and reset videoId
  const hidePopup = () => {
    setShow(false); // Hide the popup
    setVideoId(null); // Reset videoId
  };

  // JSX content for VideoPopup component
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      {" "}
      {/* Popup container */}
      <div className='opacityLayer' onClick={hidePopup}></div>{" "}
      {/* Opacity layer to close the popup */}
      <div className='videoPlayer'>
        {" "}
        {/* Video player container */}
        <span className='closeBtn' onClick={hidePopup}>
          Close
        </span>{" "}
        {/* Close button */}
        <ReactPlayer // ReactPlayer component for playing YouTube videos
          url={`https://www.youtube.com/watch?v=${videoId}`} // YouTube video URL
          controls // Show video controls
          width='100%' // Video width
          height='100%' // Video height
          // playing={true} // Autoplay option (commented out)
        />
      </div>
    </div>
  );
};

export default VideoPopup; 