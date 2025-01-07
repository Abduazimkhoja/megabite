import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProductsItem } from '../services/products/type';

interface CartState {
  items: (TProductsItem & { quantity: number })[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<TProductsItem>) {
      if (!state.items) {
        state.items = [];
      }

      const existingItem = state?.items?.find(
        (item) => item.id === action.payload.id,
      );
      if (!existingItem) {
        state?.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      }
    },
    removeCartItem(state, action: PayloadAction<{ id: string }>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    changeCartQuantity(
      state,
      action: PayloadAction<{ id: string; type: 'plus' | 'minus' }>,
    ) {
      const { id, type } = action.payload;
      const item = state?.items?.find((item) => item.id === id);
      if (item) {
        if (type === 'plus') {
          item.quantity++;
        } else {
          item.quantity--;
          if (item.quantity <= 0) {
            state.items = state.items.filter((item) => item.id !== id); // Удаляем товар, если количество 0
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, removeCartItem, changeCartQuantity, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
