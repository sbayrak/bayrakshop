import { GET_CATEGORY } from '../types';

const CategoryReducer = (state, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
  }
};

export default CategoryReducer;
