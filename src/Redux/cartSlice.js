import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    totalCost: [],
  },

  reducers: {
    addToCart: (state, action) => {
      state.cartItem.push({ ...action.payload, quantity: 1 });
    },

    incrementQuantity: (state, action) => {
      const product = state.cartItem.find(
        (item) => item.model === action.payload.model
      );
      if (product) {
        if (action.payload.quantity > product.available) {
          product.quantity = product.available;
          alert("Max Quantity Reached !");
        } else {
          product.quantity += 1;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cartItem.find(
        (item) => item.model === action.payload.model
      );
      if (product) {
        if (!product.quantity < 1) {
          product.quantity -= 1;
        }
      }
    },
    removeProduct: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item.model !== action.payload.model
      );
    },

    clearCart: (state) => {
      state.cartItem = [];
    },

    setTotalCost: (state, action) => {
      const { model, price, camera, memory, processor } = action.payload;
      const newDoc = {
        model: model,
        price: price,
        camera: camera,
        processor: processor,
        memory: memory,
        quantity: 1,
        cost: 1 * price,
      };
      state.totalCost = [...state.totalCost, { ...newDoc }];
    },

    changeInTotalCost: (state, action) => {
      const lookForProduct = state.totalCost.find(
        (item) => item.model === action.payload.model
      );
      if (lookForProduct) {
        lookForProduct.quantity = action.payload.quantity;
        lookForProduct.cost = lookForProduct.price * action.payload.quantity;
      }
    },
    cleanTotalCost: (state) => {
      state.totalCost = [];
    },
    clearTotalCost: (state, action)=> {
      state.totalCost = state.totalCost.filter(item => item.model !== action.payload.model)
    }
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  clearCart,
  setTotalCost,
  changeInTotalCost,
  cleanTotalCost,
  clearTotalCost
} = cartSlice.actions;
export default cartSlice.reducer;
