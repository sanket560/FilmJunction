import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    // State variables for data, loading state, and error message
    const [data, setData] = useState(null); // Data received from API
    const [loading, setLoading] = useState(null); // Loading state
    const [error, setError] = useState(null); // Error message if any

    useEffect(() => {
        // Update loading state and reset data and error states
        setLoading("loading..."); // Set loading state while fetching data
        setData(null); // Reset data state
        setError(null); // Reset error state

        // Fetch data from API using provided URL
        fetchDataFromApi(url)
            .then((res) => {
                // Update loading state to false and set data state with response
                setLoading(false); // Set loading state to false once data is received
                setData(res); // Set data state with response from API
            })
            .catch((err) => {
                // Update loading state to false and set error state with error message
                setLoading(false); // Set loading state to false if there's an error
                setError("Something went wrong!"); // Set error message
            });
    }, [url]); // Dependency array to trigger effect when URL changes

    // Return data, loading state, and error message as an object
    return { data, loading, error };
};

export default useFetch;