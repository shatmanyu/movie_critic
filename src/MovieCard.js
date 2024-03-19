import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateRating } from './utils';
import { supabase } from './backend/config';
import { setCreateMovieModal,setMovieUpdateModal,setMovieDeleteModal,setMovieTobeUpdate,setDeleteMovieId} from './frontend/store/movieSlice';
export default function MovieCard({movie}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleClickMovie(e){
    if(!(e.target.nodeName==="I")){
    navigate(`/review-page/${movie?.movie_id}`)
    }
  }
  function handleUpdateMovie(e){
    console.log(e,"update")
    dispatch(setMovieUpdateModal(true))
    dispatch(setMovieTobeUpdate(movie))
  }
  function handleDeleteMovie(e){
    console.log(e,"delete")
    dispatch(setMovieDeleteModal(true))
    dispatch(setDeleteMovieId(movie?.movie_id))
  }

  useEffect(()=>{

  },[])
  return (

    <div className='container-fluid' 
    style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',
    padding:'1%',border:'1px solid black',backgroundColor:'#E0DEFD',cursor:'pointer'}}
    onClick={(e)=>handleClickMovie(e)}
    >
        
        <div className='title'>{movie?.name}</div>
        <span>Released :{movie?.release_date}</span>
        <span>Ratings: {movie?.average_rating ? `${movie?.average_rating}/10` : 'Not Rated'}</span>
        <div style={{display:'flex',placeContent:'center',justifyContent:'end',gap:'8px',cursor:'pointer'}}>
            <i onClick={handleUpdateMovie} className="bi bi-pencil-square"></i>
            <i onClick={handleDeleteMovie} className="bi bi-trash-fill"></i>
        </div>
    </div>
  )
}
