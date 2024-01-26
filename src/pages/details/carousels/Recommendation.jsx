import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    // Fetch recommendations for the specified media type and ID
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        // Display recommendations in a carousel
        <Carousel
            title="Recommendations" // Title of the carousel
            data={data?.results} // Recommendations data
            loading={loading} // Loading state
            endpoint={mediaType} // Media type for the endpoint
        />
    );
};

export default Recommendation;

