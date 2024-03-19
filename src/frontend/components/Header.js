import React from 'react'
import { useNavigate } from 'react-router'
import { setCreateMovieModal } from '../store/movieSlice'
import { useDispatch,useSelector } from 'react-redux'
import './style.css'
import { setAddReviewModal } from '../store/reviewSlice'
export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleAddMovie(){
    dispatch(setCreateMovieModal(true))
  }
  function handleAddReview(){
    dispatch(setAddReviewModal(true))
  }
  return (
        <div className='container-fluid header' style={{width:'100%',backgroundColor:'#E3E8ED',padding:'10px 1.5%' ,display:'flex',placeContent:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:'30px',cursor:'pointer'}} onClick={(e)=>{navigate('/')}}>MOVIECRITIC</span>
            <div style={{gap:'10px',display:'flex'}} className=''>
            <button onClick={handleAddMovie}style={{color:'#6558f5',border:'2px solid #B5B4F0',borderRadius:'4px',padding:'10px'}} type="button" className="">Add New Movie</button>
            <button onClick={handleAddReview} style={{color:'white',backgroundColor:'#6558f5',border:'none',borderRadius:'4px',padding:'10px'}}type="button" className="">Add New Review</button>
            </div>
        </div>
  )
}
