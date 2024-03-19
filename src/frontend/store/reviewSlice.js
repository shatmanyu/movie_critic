import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
const reviewSlice = createSlice({
    name: 'review',
    initialState:{
        addReviewModal: false,
        reviewUpdateModal: false,
        reviewDeleteModal: false,
        reviewTobeUpdate:null,
        deleteReviewId:null,
        reviewsList:[]
    },
    reducers: {
        setAddReviewModal(state,action){
            state.addReviewModal = action.payload
        },
        setReviewUpdateModal(state,action){
            state.reviewUpdateModal = action.payload
        },
        setReviewDeleteModal(state,action){
            state.reviewDeleteModal = action.payload
        },
        setReviewTobeUpdate(state,action){
            state.reviewTobeUpdate = action.payload
        },
        setDeleteReviewId(state,action){
            state.deleteReviewId = action.payload
        },
        setReviewsListReducer(state,action){
            state.reviewsList = action.payload
        }
    }
})
export const {setAddReviewModal,setReviewDeleteModal,setDeleteReviewId,setReviewTobeUpdate,setReviewUpdateModal,setReviewsListReducer} = reviewSlice.actions;
export default reviewSlice.reducer;