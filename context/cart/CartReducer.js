import {
  ADD_TO_CART,
  DELETE_CART,
  REMOVE_ITEM,
  SHOW_HIDE_CART,
  UPDATE_CART,
} from '../types';

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
  }
};

export default CartReducer;
