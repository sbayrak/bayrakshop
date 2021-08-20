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

  const getCart = async (id) => {
    const getCart = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/cart?owner=${id}`,
      {
        method: 'GET',
      }
    );

    const result = await getCart.json();
    dispatch({
      type: GET_CART,
      payload: result.cartItem,
    });
  };

  const addToCart = async (product) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    getCart(product.customerId);
  };

  const deleteItemFromCart = async (customerId, productId) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart?delete=${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerId),
    });

    getCart(customerId);
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItem: state.cartItem,
        addToCart,
        getCart,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
