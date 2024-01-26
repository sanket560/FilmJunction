import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  // Initializing Redux dispatch function
  const dispatch = useDispatch();

  // Retrieving `url` state from Redux store using `useSelector`
  const { url } = useSelector((state) => state.home);

  // Function to fetch API configuration data and update Redux store
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // Extracting necessary URLs from API response
      const apiUrl = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      // Dispatching action to update `url` state in Redux store
      dispatch(getApiConfiguration(apiUrl));
    });
  };

  // Function to fetch genres data and update Redux store
  const genresCall = async () => {
    // Array to store promises for fetching genre data
    let promises = [];
    // Endpoints for fetching genre data
    let endPoints = ["tv", "movie"];
    // Object to store all genres data
    let allGenres = {};

    // Looping through each endpoint to create promises for fetching genre data
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    // Waiting for all promises to resolve
    const data = await Promise.all(promises);

    // Processing genre data and updating `allGenres` object
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // Dispatching action to update `genres` state in Redux store
    dispatch(getGenres(allGenres));
  };

  // useEffect hook to run once when component mounts
  useEffect(() => {
    // Fetching API configuration and genres data
    fetchApiConfig();
    genresCall();
  }, []);

  // Rendering the application's routes and components
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* 
    Renders the Home component when the path is '/'.
*/}

        <Route path='/:mediaType/:id' element={<Details />} />
        {/* 
:mediaType and :id to determine which media item to display.
    Renders the Details component when the path matches '/:mediaType/:id'.
*/}

        <Route path='/search/:query' element={<SearchResult />} />
        {/* 
:query to determine the search query.
    Renders the SearchResult component when the path matches '/search/:query'.
*/}

        <Route path='/explore/:mediaType' element={<Explore />} />
        {/* 
    :mediaType to determine the type of media to explore.
    Renders the Explore component when the path matches '/explore/:mediaType'.
*/}

        <Route path='*' element={<PageNotFound />} />
        {/* 
    Catch-all route for handling any other paths.
    Renders the PageNotFound component when no other routes match.
*/}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// Exporting the `App` component as default
export default App;
