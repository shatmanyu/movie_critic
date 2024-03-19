import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
// const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const movieSlice = createSlice({
    name: 'movie',
    initialState:{
        createMovieModal : false,
        movieUpdateModal: false,
        movieDeleteModal: false,
        movieTobeUpdate:null,
        deleteMovieId:null,
        moviesList:[]
    },
    reducers: {
        setCreateMovieModal(state,action){
            state.createMovieModal = action.payload
        },
        setMovieUpdateModal(state,action){
            state.movieUpdateModal = action.payload
        },
        setMovieDeleteModal(state,action){
            state.movieDeleteModal = action.payload
        },
        setMovieTobeUpdate(state,action){
            state.movieTobeUpdate = action.payload
        },
        setDeleteMovieId(state,action){
            state.deleteMovieId = action.payload
        },
        setMoviesListReducer(state,action){
            state.moviesList = action.payload
        }
    }
})
export const {setCreateMovieModal,setMovieUpdateModal,setMovieDeleteModal,setMovieTobeUpdate,setDeleteMovieId, setMoviesListReducer} = movieSlice.actions;
export default movieSlice.reducer;