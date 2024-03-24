import { createSlice } from "@reduxjs/toolkit";
const reviewSlice = createSlice({
    name: "review",
    initialState: {
      reviews: [],
      specificReview: []
      
    },
    reducers: {
      setReviews: (state, action) =>{
        state.reviews = [...action.payload]
      },
      clearReview: (state, action) =>{
        state.reviews = state.reviews.filter(item => item.model !== action.payload.model)
      },
      setSpecificReview: (state, action) => {
        state.specificReview.push(action.payload)
      },
      clearSpecificReview: (state, action) =>{
        state.specificReview = state.specificReview.filter(item => item.model !== action.payload.model)
      },
      cleanSpecificReviews: (state) =>{
        state.specificReview = []
      }
     
    },
  });
  
export const {setReviews, clearReview, setSpecificReview, clearSpecificReview, cleanSpecificReviews  } =
  reviewSlice.actions;
export default reviewSlice.reducer;
