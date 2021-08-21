import {
  ADD_TO_CART,
  DELETE_CART,
  REMOVE_ITEM,
  SHOW_HIDE_CART,
  UPDATE_CART,
  GET_CART,
  LOGOUT,
} from '../types';

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };

    case GET_CART:
      return {
        ...state,
        cartItem: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        cartItem: [],
      };
  }
};

export default CartReducer;
