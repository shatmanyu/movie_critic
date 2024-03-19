import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setCreateMovieModal, setDeleteMovieId, setMovieDeleteModal, setMovieTobeUpdate, setMovieUpdateModal } from '../store/movieSlice';
import {useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { supabase } from '../../backend/config';
function AddNewMovie() {
  const dispatch = useDispatch()
  const movieUpdate = useSelector((state)=>state?.movie?.movieUpdateModal)
  const movieTobeUpdate = useSelector((state)=>state?.movie?.movieTobeUpdate)
  const deleteMovie = useSelector((state)=>state?.movie?.movieDeleteModal)
  const deletedMovieId = useSelector((state)=>state?.movie?.deleteMovieId)
  const [newMovie,setNewMovie] = useState(movieUpdate ? movieTobeUpdate : {name:'',release_date:''})
  const show = useSelector((state)=>state.movie.createMovieModal)
  const handleClose = () => {
    dispatch(setCreateMovieModal(false))
    dispatch(setMovieUpdateModal(false))
    dispatch(setMovieDeleteModal(false))
    dispatch(setDeleteMovieId(null))
    dispatch(setMovieTobeUpdate(null))
  }
  async function handleAddMovie(e){
    if(movieUpdate){
      // updation
      try {
        const { data, error } = await supabase
      .from('movie')
      .update(newMovie)
      .eq('movie_id', movieTobeUpdate?.movie_id)
      .select()
      if(error){
        return
      }
      // console.log({data},'movie-updated')
      dispatch(setMovieUpdateModal(false))
      dispatch(setMovieTobeUpdate(null))
      } catch (error) {
        console.log({'error':error.message});
      }
      
    }
    else{
      // creation
     try {
        const { data, error } = await supabase
        .from('movie')
        .insert(newMovie)
        .select()
        if(error){
            return
        }
        if(data){
          console.log({data});
        dispatch(setCreateMovieModal(false))
        }
     } catch (error) {
        console.log({'error':error.message});
     }
    }
  }

  async function handleDeleteMovie(){
    if(deletedMovieId){
    try {
      const { data,error } = await supabase
      .from('movie')
      .delete()
      .eq('movie_id',deletedMovieId)
      if(error){
        return
      }
      dispatch(setMovieDeleteModal(false))
    } catch (error) {
      console.log({'error':error.message})
    }
  }
  }
  return (
    <>
    {!deleteMovie ?
      <Modal show={show || movieUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movieUpdate ? "Update Movie" : "Add new movie"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <input onChange={(e)=>setNewMovie({...newMovie,name:e.target.value})}defaultValue={movieUpdate?movieTobeUpdate?.name:''} className="mb-3" type="text" placeholder="Name"  style={{width:'100%',height:'45px',padding:'0px 10px',border:'2px solid #C5CED6',borderRadius:'4px'}}/>
            <input onChange={(e)=>setNewMovie({...newMovie,release_date:e.target.value})}defaultValue={movieUpdate && movieTobeUpdate?.release_date} className="mb-3" type="date" placeholder="Release Date"  style={{width:'100%',height:'45px',padding:'0px 10px',border:'2px solid #C5CED6',borderRadius:'4px'}}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddMovie}>
            {movieUpdate ? "Update Movie" : "Create Movie"}
          </Button>
        </Modal.Footer>
      </Modal> :
      <>
      <Modal show={deleteMovie} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteMovie}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      }

    </>
  );
}

export default AddNewMovie;

