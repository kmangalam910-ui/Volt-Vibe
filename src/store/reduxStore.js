import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

store.subscribe(() => {
  try{
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  }catch(error){
    console.error('Error saving cart to localStorage:', error);
  }
})

export default store;