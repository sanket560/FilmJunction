// Importing the `configureStore` function from the `@reduxjs/toolkit` package
import { configureStore } from "@reduxjs/toolkit";

// Importing the `homeSlice` reducer from the `homeSlice.js` file
import homeSlice from "./homeSlice";

// Creating a Redux store using the `configureStore` function
export const store = configureStore({
    // Configuring the reducer for the store
    reducer: {
        // Assigning the `homeSlice` reducer to the `home` slice of the store
        home: homeSlice,
    },
});
