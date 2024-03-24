import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import wishlistSlice from "./wishlistSlice";
import reviewSlice from "./reviewSlice";
import cartSlice from "./cartSlice";
import { ecommerceAPI } from "./api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  [ecommerceAPI.reducerPath]: ecommerceAPI.reducer,
  auth: authReducer,
  wish : wishlistSlice,
  review: reviewSlice,
  cart: cartSlice
});

const persistConfig = {
  key: "ecommerceApp",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(ecommerceAPI.middleware),
});

const persistor = persistStore(store);

export { persistor, store };
