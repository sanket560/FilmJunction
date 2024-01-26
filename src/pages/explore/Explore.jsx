import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.css";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

// Explore component
const Explore = () => {
    // State variables for data, page number, loading state, genre, and sorting criteria
    const [data, setData] = useState(null); // State variable to store fetched data
    const [pageNum, setPageNum] = useState(1); // State variable to track current page number
    const [loading, setLoading] = useState(false); // State variable to track loading state
    const [genre, setGenre] = useState(null); // State variable to store selected genre
    const [sortby, setSortby] = useState(null); // State variable to store selected sorting criteria

    // Get the media type from the URL parameters
    const { mediaType } = useParams(); // Hook to access URL parameters

    // Fetch genres data based on the media type
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`); // Custom hook to fetch data from API

    // Function to fetch initial data based on selected filters
    const fetchInitialData = () => {
        setLoading(true); // Set loading state to true
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => { // Fetch data from API
            setData(res); // Set fetched data to state variable
            setPageNum((prev) => prev + 1); // Increment page number
            setLoading(false); // Set loading state to false
        });
    };

    // Function to fetch next page data
    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => { // Fetch data for next page
            if (data?.results) { // Check if data results exist
                setData({ // Update data with new results
                    ...data,
                    results: [...data?.results, ...res.results], // Concatenate new results with existing results
                });
            } else {
                setData(res); // Set new data if no existing results
            }
            setPageNum((prev) => prev + 1); // Increment page number
        });
    };

    // Reset filters and fetch initial data when media type changes
    useEffect(() => {
        filters = {}; // Reset filters
        setData(null); // Reset data
        setPageNum(1); // Reset page number
        setSortby(null); // Reset sorting criteria
        setGenre(null); // Reset genre
        fetchInitialData(); // Fetch initial data
    }, [mediaType]); // Depend on media type

    // Event handler for filter change
    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") { // Check if sorting criteria changed
            setSortby(selectedItems); // Update sorting criteria state variable
            if (action.action !== "clear") { // Check if sorting criteria cleared
                filters.sort_by = selectedItems.value; // Update filters with sorting criteria
            } else {
                delete filters.sort_by; // Remove sorting criteria from filters
            }
        }

        if (action.name === "genres") { // Check if genre selection changed
            setGenre(selectedItems); // Update genre state variable
            if (action.action !== "clear") { // Check if genre selection cleared
                let genreId = selectedItems.map((g) => g.id); // Extract genre IDs
                genreId = JSON.stringify(genreId).slice(1, -1); // Convert IDs to string
                filters.with_genres = genreId; // Update filters with genre IDs
            } else {
                delete filters.with_genres; // Remove genre IDs from filters
            }
        }

        setPageNum(1); // Reset page number
        fetchInitialData(); // Fetch initial data with updated filters
    };

    // JSX content for Explore component
    return (
        <div className="explorePage"> {/* Explore page container */}
            <ContentWrapper> {/* Content wrapper */}
                <div className="pageHeader"> {/* Page header */}
                    <div className="pageTitle">{mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}</div> {/* Page title based on media type */}
                    <div className="filters"> {/* Filters section */}
                        {/* Dropdown for selecting genres */}
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        {/* Dropdown for selecting sorting criteria */}
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {/* Display loading spinner while fetching data */}
                {loading && <Spinner initial={true} />}
                {/* Render data when not loading */}
                {!loading && (
                    <>
                        {/* Check if data results exist */}
                        {data?.results?.length > 0 ? (
                            // Infinite scroll for displaying data
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {/* Map through data results and render movie cards */}
                                {data?.results?.map((item, index) => {
                                    // Exclude person data
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            // Display message when no results found
                            <span className="resultNotFound">Sorry, Results not found!</span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore; // Export Explore component
