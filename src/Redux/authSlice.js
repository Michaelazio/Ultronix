import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    userUpdatedProfile: [],
    userImage: null,
    nameTager: null,
    
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserOut: (state) => {
      state.token = null;
      state.user = null;
    },
    setUserUpdatedProfile: (state, action) => {
      state.userUpdatedProfile = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload.imageName;
    },
    deleteUserImage: (state) => {
      state.userImage = null;
    },
    setNameTager : (state, action) =>{
      state.nameTager = action.payload.imageName
    },
    deleteNameTagger: (state) => {
      state.nameTager = null
    },
  
  },
});

export const {
  setToken,
  setUser,
  setUserOut,
  setUserUpdatedProfile,
  setUserImage,
  deleteUserImage,
  setNameTager,
  deleteNameTagger,
  
} = authSlice.actions;
export default authSlice.reducer;
