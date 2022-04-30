import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCTS_LOADING,
  CURRENT_PRODUCT,
  SEARCH_PRODUCTS,
  PRODUCT_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  products: [],
  currentProduct: [],
  searchProducts: { title: String, result: [] },
  loading: false,
};

export default function (state = INITIAL_STATE, action) {
  // state could be {}
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    case CURRENT_PRODUCT:
      return { ...state, currentProduct: action.payload, loading: false };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: {
          title: action.payload.searchTitle,
          result: action.payload.searchResult,
        },
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        created: true,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case UPDATE_PRODUCT:
      //const { id, data } = action.payload;
      return {
        ...state,
        created: true,
        products: [...state.products],
      };
    case PRODUCTS_LOADING:
      return { ...state, error: false, created: false };
    default:
      return state;

    case PRODUCT_ERROR:
      return { ...state, error: true };
  }
}
