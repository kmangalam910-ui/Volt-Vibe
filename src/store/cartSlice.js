import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'CART',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      return [...state, action.payload];
    },

    removeToCart: (state, action) => {
      console.log('Removed from cart');
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;