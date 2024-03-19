import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import reviewReducer from './reviewSlice';
const store = configureStore({
    reducer: {
        movie:movieReducer,
        review:reviewReducer
        
    },
});

export default store;