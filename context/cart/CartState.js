import { useReducer } from 'react';
import {
  ADD_TO_CART,
  DELETE_CART,
  REMOVE_ITEM,
  SHOW_HIDE_CART,
  UPDATE_CART,
  GET_CART,
} from '../types';
import CartContext from './CartContext';
import CartReducer from './CartReducer';

const initialState = {
  showCart: false,
  cartItem: [],
  customerId: '',
  total: 0,
};

const CartState = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const getCart = async () => {
    const getCart = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
      method: 'GET',
    });
    const result = await getCart.json();
    console.log(result);
    dispatch({
      type: GET_CART,
      payload: result,
    });
  };

  const addToCart = async (product) => {
    const addToCartDB = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/cart/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );

    getCart();
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItem: state.cartItem,
        addToCart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
