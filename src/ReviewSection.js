import React from 'react'
import { useDispatch } from 'react-redux'
import { setAddReviewModal,setReviewDeleteModal,setDeleteReviewId,setReviewTobeUpdate,setReviewsListReducer,setReviewUpdateModal } from './frontend/store/reviewSlice'
export default function ReviewSection({review}) {
    const dispatch = useDispatch()
    function handleUpdateReview(e){
        dispatch(setReviewUpdateModal(true))
        dispatch(setReviewTobeUpdate(review))
      }
      function handleDeleteReview(e){
        dispatch(setReviewDeleteModal(true))
        dispatch(setDeleteReviewId(review))
      }
  return (
    <div className='container-fluid' style={{display:'flex',flexDirection:'column',gap:'40px',border:'2px solid #C5CED6'}}>
        <div style={{display:'flex',placeContent:'center',justifyContent:'space-between'}}>
            <span>{review?.review_comment}</span>
            <span style={{color:'#6558f5'}}>{`${review?.rating}/10`}</span>
        </div>

        <div style={{display:'flex',placeContent:'center',justifyContent:'space-between'}}>
            <span style={{fontStyle:'italic'}}>
                {`By ${review?.reviewer_name}`}
            </span>
            <div style={{display:'flex',placeContent:'center',justifyContent:'end',gap:'12px',cursor:'pointer'}}>
                <i onClick={handleUpdateReview}  className="bi bi-pencil-square"></i>
                <i onClick={handleDeleteReview}  className="bi bi-trash-fill"></i>
            </div>
        </div>
        
    </div>
  )
}
