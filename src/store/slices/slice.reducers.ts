import { sidebarReducer } from '.';
import { cartReducer } from './cart.slice';

export const sliceReducers = {
  cart: cartReducer,
  sidebar: sidebarReducer,
};
