import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  //? decide the initial state yourself by looking at the app
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload; //?extract the item from the action
      const existingItem = state.items.find((item) => item.id === newItem.id); //? add items as a new entry if item id doesn't match with new item id
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          //?push() modifies the array but its fine in redux toolkit
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        //?id doesn't change and price doesn't change
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload; //?expect a payload
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price; //!imp: update the cart total
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
