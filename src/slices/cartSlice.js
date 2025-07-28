import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalItems: localStorage.getItem("totalItems")
      ? JSON.parse(localStorage.getItem("totalItems"))
      : 0,
  },
  reducers: {
    setTotalItems(state, action) {
      state.token = action.payload;
    },
    // add to cart
    // remove from cart
    // resetcart
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
