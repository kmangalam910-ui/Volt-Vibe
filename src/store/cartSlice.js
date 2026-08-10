import { createSlice } from "@reduxjs/toolkit";

const localCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
}

const cartSlice = createSlice({
  name: 'CART',
  initialState: localCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeToCart: (state, action) => {
      const id = typeof action.payload === 'object' && action.payload !== null ? action.payload.id : action.payload;
      return state.filter((item) => item.id !== id);
    },

    incrementQuantity: (state, action) => {
      const id = typeof action.payload === 'object' && action.payload !== null ? action.payload.id : action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      }
    },

    decrementQuantity: (state, action) => {
      const id = typeof action.payload === 'object' && action.payload !== null ? action.payload.id : action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        if ((existingItem.quantity || 1) > 1) {
          existingItem.quantity -= 1;
        } else {
          return state.filter((item) => item.id !== id);
        }
      }
    },

    clearCart: () => {
      return [];
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;