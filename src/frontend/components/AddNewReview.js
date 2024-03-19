import Button from 'react-bootstrap/Button';
import './style.css'
import { useState } from 'react';
import { supabase } from '../../backend/config';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector } from 'react-redux';
import { updateRating } from '../../utils';
import { setAddReviewModal,setReviewDeleteModal,setDeleteReviewId,setReviewTobeUpdate,setReviewUpdateModal,setReviewsListReducer} from '../store/reviewSlice';
function AddNewReview() {
  const dispatch = useDispatch()
  const reviewUpdate = useSelector((state)=>state?.review?.reviewUpdateModal)
  const reviewTobeUpdate = useSelector((state)=>state?.review?.reviewTobeUpdate)
  const deleteReview = useSelector((state)=>state?.review?.reviewDeleteModal)
  const deletedReviewData = useSelector((state)=>state?.review?.deleteReviewId)
  const show = useSelector((state)=>state?.review?.addReviewModal)
  const moviesOptions = useSelector((state)=>state?.movie?.moviesList)
  const [movieId,setMovieId] = useState(moviesOptions ? moviesOptions[0]?.movie_id:'')
  const [newReview,setNewReview] = useState(reviewUpdate ? reviewTobeUpdate : {reviewer_name:'',rating:'',review_comment:''})
  
  const handleClose = () => {
    dispatch(setAddReviewModal(false))
    dispatch(setReviewUpdateModal(false))
    dispatch(setReviewDeleteModal(false))
    dispatch(setDeleteReviewId(null))
    dispatch(setReviewTobeUpdate(null))
  }
  async function handleAddReview(){
    if(reviewUpdate){
      // updation
      try {
        const { data, error } = await supabase
      .from('review')
      .update(newReview)
      .eq('review_id',Number(reviewTobeUpdate?.review_id))
      .select()
      if(error){
        return
      }
      console.log({data},'review-updated',reviewTobeUpdate)
      updateRating(reviewTobeUpdate?.review_movie_id).then((res)=>{
        dispatch(setReviewUpdateModal(false))
        dispatch(setReviewTobeUpdate(null))
      })
      } catch (error) {
        console.log({'error':error.message});
      }
  }
  else{
    // creation 
    // add review 
    // also update the average rating of movie
    newReview['review_movie_id'] = Number(movieId)
    const postReview = newReview
    console.log({newReview},movieId,postReview)
    try {
      const { data, error } = await supabase
      .from('review')
      .insert(postReview)
      .select()
      if(error){
          return
      }
      if(data){
        console.log({data});
      updateRating(movieId).then((res)=>{
        dispatch(setAddReviewModal(false))
      })
      
      }
   } catch (error) {
      console.log({'error':error.message});
   }
  }
}
async function handleDeleteReview(){
  if(deletedReviewData?.review_id){
  try {
    const { data,error } = await supabase
    .from('review')
    .delete()
    .eq('review_id',deletedReviewData?.review_id)
    if(error){
      return
    }
    // console.log({data},"delete-review")
    updateRating(deletedReviewData?.review_movie_id).then((res)=>{
      dispatch(setReviewDeleteModal(false))
    })
    
  } catch (error) {
    console.log({'error':error.message})
  }
}
}
  return (
    <>{!deleteReview ? 
      <Modal show={show || reviewUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{reviewUpdate ? 'Update Review' : 'Add new Review'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Select defaultValue={reviewUpdate ? reviewTobeUpdate.review_movie_id : ''}disabled={reviewUpdate}onChange={(e)=>setMovieId(e.target.value)} className="mb-3" style={{width:'100%',height:'45px',border:'2px solid #C5CED6'}}>
            {moviesOptions?.map((item,index)=>{
              return(
               <option key={index} value={item?.movie_id}>{item?.name}</option>)
            })
           }
          </Form.Select>
            <input defaultValue={reviewUpdate ? reviewTobeUpdate?.reviewer_name : ''} onChange={(e)=>setNewReview({...newReview,reviewer_name:e.target.value})}className="mb-3" type="text" placeholder="Your Name"  style={{width:'100%',height:'45px',padding:'0px 10px',border:'2px solid #C5CED6',borderRadius:'4px'}}/>
            <input defaultValue={reviewUpdate ? reviewTobeUpdate?.rating : ''} onChange={(e)=>setNewReview({...newReview,rating:e.target.value})} className="mb-3" type="text" placeholder="Rating out of 10"  style={{width:'100%',height:'45px',padding:'0px 10px',border:'2px solid #C5CED6',borderRadius:'4px'}}/>
            <textarea defaultValue={reviewUpdate ? reviewTobeUpdate?.review_comment : ''} onChange={(e)=>setNewReview({...newReview,review_comment:e.target.value})} placeholder="Review Comments" style={{width:'100%',height:'90px',padding:'6px 10px',border:'2px solid #C5CED6',borderRadius:'4px'}} name="text" id="review-comment" cols="30" rows="10"></textarea>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddReview}>
            {reviewUpdate ? 'Update Review' : 'Add Review'}
          </Button>
        </Modal.Footer>
      </Modal>
       : 
      <>
      <Modal show={deleteReview} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteReview}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
}
    </>
  );
}
export default AddNewReview;

