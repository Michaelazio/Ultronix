import { createSlice } from "@reduxjs/toolkit";
const wishlistSlice = createSlice({
    name: "wish",
    initialState: {
      wishlistPage: [],
      wishlistButtonForSpecificProduct: [],
    },
    reducers: {
      setToWishlist: (state, action) => {
        state.wishlistPage.push(action.payload);
      },
      deleteWishlistItem: (state, action) => {
        state.wishlistPage = state.wishlistPage.filter(
          (item) => item.model !== action.payload.model
        );
      },
      cleanWishListPage: (state) => {
        state.wishlistPage = [];
      },
      setBtn: (state, action) => {
        if (!state.wishlistButtonForSpecificProduct) {
          state.wishlistButtonForSpecificProduct = []; 
        }
        state.wishlistButtonForSpecificProduct.push(action.payload.model);
      },
      cancelWishlistBtn: (state, action) => {
        state.wishlistButtonForSpecificProduct = state.wishlistButtonForSpecificProduct.filter(
          (item) => item !== action.payload.model
        );
      },
      cleanWishForSpecificProduct: (state)=> {
        state.wishlistButtonForSpecificProduct = []
      }
     
    },
  });
  
export const { setToWishlist, deleteWishlistItem, cleanWishListPage, setBtn,cancelWishlistBtn, cleanWishForSpecificProduct } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
