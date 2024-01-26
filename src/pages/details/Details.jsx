import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
    // Extracting parameters from the URL
    const { mediaType, id } = useParams();

    // Fetching video data
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

    // Fetching credits data
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    // Rendering the Details component
    return (
        <div>
            {/* Displaying details banner with video and crew */}
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            {/* Displaying cast */}
            <Cast data={credits?.cast} loading={creditsLoading} />
            {/* Displaying videos section */}
            <VideosSection data={data} loading={loading} />
            {/* Displaying similar media */}
            <Similar mediaType={mediaType} id={id} />
            {/* Displaying recommended media */}
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;