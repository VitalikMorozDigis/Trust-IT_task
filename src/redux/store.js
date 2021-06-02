import { configureStore } from "@reduxjs/toolkit";
import PRReducer from './slices/PRSlice';

export default configureStore({
    reducer: {
        PR: PRReducer,
    },
});
