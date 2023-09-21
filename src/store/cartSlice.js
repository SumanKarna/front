import { createSlice } from "@reduxjs/toolkit";
import { fromStorage, inStorage } from "../lib";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: JSON.parse(fromStorage("130cart") || "{}"),
  },
  reducers: {
    setCart: (state, action) => {
      state.value = action.payload;
      inStorage("130cart", JSON.stringify(action.payload), true);
    },
    clearCart: (state) => {
      state.value = {};
      clearStorage("130cart");
    },
  },
});

export default cartSlice.reducer;
export const { setCart, clearCart } = cartSlice.actions;
