import { supabase } from './backend/config';

export async function updateRating(movieId){
    // calculate average ratings
    // and update in Db
    let ans = null
    try {
      let { data, error } = await supabase
      .from('review')
      .select("*")
      .eq('review_movie_id', movieId)
      if(error){
        return 
      }
      const avg = data?.reduce((prevValue,item)=>{
        return (prevValue + parseFloat(item?.rating))
      },0)
    //   console.log({avg})
      ans = avg/(data?.length)
    } catch (error) {
      console.log({'error':error?.message});
    }
    try {
        const { data, error } = await supabase
      .from('movie')
      .update({average_rating:ans.toFixed(2)})
      .eq('movie_id',movieId)
      .select()
      if(error){
        return
      }
      return data
      } catch (error) {
        console.log({'error':error.message});
      }
    //   console.log({ans},'reviewupdated'); 
  }