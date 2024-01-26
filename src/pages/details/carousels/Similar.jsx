import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    // Fetch similar movies or TV shows based on the specified media type and ID
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    // Determine the title based on the media type
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        // Display similar movies or TV shows in a carousel
        <Carousel
            title={title} // Title of the carousel
            data={data?.results} // Similar movies or TV shows data
            loading={loading} // Loading state
            endpoint={mediaType} // Media type for the endpoint
        />
    );
};

export default Similar;
