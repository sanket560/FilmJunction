// Importing axios library for making HTTP requests
import axios from "axios";

// Defining the base URL for The Movie Database API
const BASE_URL = "https://api.themoviedb.org/3";

// Retrieving the API token from environment variables using Vite
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// Setting up headers for authorization using the retrieved token
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

// Defining a function to fetch data from the API asynchronously
export const fetchDataFromApi = async (url, params) => {
    try {
        // Making a GET request to the specified URL with headers and parameters
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        // Returning the data received from the API
        return data;
    } catch (err) {
        // Handling errors if any occur during the API request
        console.log(err);
        // Returning the error object
        return err;
    }
};
