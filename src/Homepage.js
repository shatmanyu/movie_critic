import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import './style.css';
import { useDispatch,useSelector } from 'react-redux';
import AddNewMovie from './AddNewMovie';
import { supabase } from './backend/config';
import AddNewReview from './AddNewReview';
import {setMoviesListReducer} from './frontend/store/movieSlice';
export default function Homepage() {
  const movieModal = useSelector((state)=>state?.movie?.createMovieModal)
  const reviewModal = useSelector((state)=>state?.review?.addReviewModal)
  const chkMovieUpdate = useSelector((state)=>state?.movie?.movieUpdateModal)
  const chkMovieDelete = useSelector((state)=> state?.movie?.movieDeleteModal)
  const [txt,setTxt] = useState('')
  const [moviesList,setMoviesList] = useState([])
  const [filteredMovies,setFilteredMovies] = useState([])
  const dispatch = useDispatch()

  async function getMovies(){
    try {
    let { data, error } = await supabase
    .from('movie')
    .select('*')
    if(error){
      return 
    }
    console.log({data},'movies-list')
    setMoviesList(data)
    dispatch(setMoviesListReducer(data))
    } catch (error) {
      console.log({'error':error.message})
    }
  }
  useEffect(()=>{
    getMovies()
  },[movieModal,chkMovieUpdate,chkMovieDelete,reviewModal])

  useEffect(() => {
    if(txt === ''){
      setFilteredMovies(moviesList)
    }
    else{
    const filteredResults = moviesList.filter(movie =>
      movie?.name?.toLowerCase().includes(txt?.toLowerCase()) || 
      movie?.release_date.toString()?.toLowerCase().includes(txt?.toLowerCase()) ||
      movie?.average_rating.toString()?.toLowerCase().includes(txt?.toLowerCase())
    );
      setFilteredMovies(filteredResults);
    }
  }, [txt, moviesList]);
  return (
    <div>
        
        <div className='container-fluid'>
        <h1 style={{display:'flex',padding:'3% 0px'}}>The best movie reviews site!</h1>
        <div className="search-container">
            <div style={{display:'flex',width:'280px',padding:'0px 5px',gap:"5px"}}>
            <i style={{position:'relative',top:'4px'}}className="bi bi-search"></i>
            <input onChange={(e)=>{setTxt(e.target.value)}} style={{width:'100%'}} type="text" placeholder="Search for your favourite movie" name="search"/>
            </div>
        </div>
        <div className='container-fluid movie-grid' style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'auto',rowGap:'20px',columnGap:'20px',padding:'25px 0px'}}>
            {filteredMovies?.map((movie)=>{
              return (
                  <MovieCard key={movie.movie_id} movie={movie}/>
              )
            })}
        </div>
        </div>
        {movieModal || chkMovieUpdate || chkMovieDelete ? <AddNewMovie/> : ''}
        {reviewModal ? <AddNewReview/> : ''}
    </div>
  )
}
