import { GET_CATEGORY } from '../types';
import { useReducer } from 'react';
import CategoryReducer from './CategoryReducer';
import CategoryContext from './CategoryContext';

const initialState = {
  categories: [],
};

const CategoryState = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const getCategories = async () => {
    const getCategories = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`,
      {
        method: 'GET',
      }
    );
    const result = await getCategories.json();
    dispatch({
      type: GET_CATEGORY,
      payload: result,
    });
  };

  return (
    <CategoryContext.Provider
      value={{ categories: state.categories, getCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
