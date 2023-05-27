import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface ICartState {
  items: ICartItem[];
  totalPrice: number;
}

interface IRestaurantCartState {
  [restaurantId: string]: ICartState;
}

const initialState: IRestaurantCartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(
      state,
      action: PayloadAction<{ restaurantId: string; item: ICartItem }>
    ) {
      const { restaurantId, item } = action.payload;
      if (!state[restaurantId]) {
        state[restaurantId] = { items: [], totalPrice: 0 };
      }
      const itemIndex = state[restaurantId].items.findIndex(
        (i) => i.name === item.name
      );
      if (itemIndex === -1) {
        state[restaurantId].items.push({ ...item, amount: 1 });
      } else {
        state[restaurantId].items[itemIndex].amount += 1;
      }
      state[restaurantId].totalPrice += item.price;
    },
    removeItemFromCart(
      state,
      action: PayloadAction<{ restaurantId: string; itemName: string }>
    ) {
      const { restaurantId, itemName } = action.payload;
      const itemIndex = state[restaurantId].items.findIndex(
        (item) => item.name === itemName
      );
      if (itemIndex !== -1) {
        const itemPrice = state[restaurantId].items[itemIndex].price;
        const itemQuantity = state[restaurantId].items[itemIndex].amount;
        if (itemQuantity === 1) {
          state[restaurantId].items.splice(itemIndex, 1);
          state[restaurantId].totalPrice -= itemPrice;
        } else {
          state[restaurantId].items[itemIndex].amount -= 1;
          state[restaurantId].totalPrice -= itemPrice;
        }
      }
    },
    clearCartItems(state, action: PayloadAction<string>) {
      const restaurantId = action.payload;
      state[restaurantId] = { items: [], totalPrice: 0 };
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
