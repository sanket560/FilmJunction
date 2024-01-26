import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.css";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../Images/no-results.png";

const SearchResult = () => {
    // State variables for data, page number, and loading state
    const [data, setData] = useState(null); // State variable to store fetched data
    const [pageNum, setPageNum] = useState(1); // State variable to track current page number
    const [loading, setLoading] = useState(false); // State variable to track loading state

    // Get the query from the URL parameters
    const { query } = useParams(); // Hook to access URL parameters

    // Function to fetch initial data based on the query
    const fetchInitialData = () => {
        setLoading(true); // Set loading state to true
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then( // Fetch data from API
            (res) => {
                setData(res); // Set fetched data to state variable
                setPageNum((prev) => prev + 1); // Increment page number
                setLoading(false); // Set loading state to false
            }
        );
    };

    // Function to fetch next page data
    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then( // Fetch data for next page
            (res) => {
                if (data?.results) { // Check if data results exist
                    setData({ // Update data with new results
                        ...data,
                        results: [...data?.results, ...res.results], // Concatenate new results with existing results
                    });
                } else {
                    setData(res); // Set new data if no existing results
                }
                setPageNum((prev) => prev + 1); // Increment page number
            }
        );
    };

    // Fetch initial data when query changes
    useEffect(() => {
        setPageNum(1); // Reset page number
        fetchInitialData(); // Fetch initial data
    }, [query]); // Depend on query

    // JSX content for SearchResult component
    return (
        <div className="searchResultsPage"> {/* SearchResult page container */}
            {/* Display loading spinner while fetching data */}
            {loading && <Spinner initial={true} />}
            {/* Render data when not loading */}
            {!loading && (
                <ContentWrapper> {/* Content wrapper */}
                    {/* Check if data results exist */}
                    {data?.results?.length > 0 ? (
                        <>
                            {/* Page title showing search query and number of results */}
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            {/* Infinite scroll for displaying data */}
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {/* Map through data results and render movie cards */}
                                {data?.results.map((item, index) => {
                                    // Exclude person data
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        // Display message and image when no results found
                        <span className="resultNotFound">
                            <p>Sorry, Results not found!</p>
                            <img src={noResults} alt="" />
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
