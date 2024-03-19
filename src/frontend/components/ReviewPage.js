import React, { useEffect } from 'react'
import ReviewSection from './ReviewSection'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setMoviesListReducer } from '../store/movieSlice'
import AddNewMovie from './AddNewMovie'
import { supabase } from '../../backend/config'
import AddNewReview from './AddNewReview'
export default function ReviewPage() {
  const {movieId} = useParams()
  const dispatch = useDispatch()
  const movieModal = useSelector((state)=>state?.movie?.createMovieModal)
  const reviewModal = useSelector((state)=>state?.review?.addReviewModal)
  const chkReviewUpdate = useSelector((state)=>state?.review?.reviewUpdateModal)
  const chkReviewDelete = useSelector((state)=>state?.review?. reviewDeleteModal)
  const chkMovieUpdate = useSelector((state)=>state?.movie?.movieUpdateModal)
  const chkMovieDelete = useSelector((state)=> state?.movie?.movieDeleteModal)
  const [reviewsList,setReviewsList] = useState([])
  const [movieData,setMovieData] = useState(null)

  async function getReviews(){
    try {
        let { data, error } = await supabase
        .from('review')
        .select("*")
        .eq('review_movie_id', movieId)
        if(error){
            return 
        }
        if(data){
            setReviewsList(data)
        }
        } catch (error) {
        console.log({'error':error?.message});
        }
  }
  async function getMovie(){
    try {
        let { data, error } = await supabase
        .from('movie')
        .select()
        .eq('movie_id', movieId)
        if(error){
            return 
        }
        if(data){
            setMovieData(data[0])
        }
        } catch (error) {
        console.log({'error':error?.message});
        }
  }
  async function getMovies(){
    try {
    let { data, error } = await supabase
    .from('movie')
    .select('*')
    if(error){
      return 
    }
    dispatch(setMoviesListReducer(data))
    } catch (error) {
      console.log({'error':error.message})
    }
  }
  useEffect(()=>{
    getReviews(movieId)
    getMovie(movieId)
    getMovies()
  },[chkReviewUpdate,chkReviewDelete,reviewModal])


  return (
    <div style={{padding:'4% 0px'}}>
        <div className='container-fluid' style={{display:'flex',placeContent:'center',justifyContent:'space-between'}}>
            <h1>
                {movieData?.name}
            </h1>
            <h1 style={{color:'#6558f5'}}>
                {movieData?.average_rating ?`${movieData?.average_rating}/10`: 'Not Rated'}
            </h1>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'40px',padding:'10% 2% 0px 2%'}}>
            {reviewsList?.map((review,index)=>{
                return(
                    <ReviewSection key={index} review={review} />
                )
            })}
        </div>
        {movieModal || chkMovieUpdate || chkMovieDelete ? <AddNewMovie/> : ''}
        {reviewModal || chkReviewUpdate || chkReviewDelete ? <AddNewReview/> : ''}
    </div>
  )
}
