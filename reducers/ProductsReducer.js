//reducers are pure functions which handle actions
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  SEARCH_PRODUCT
} from "../actionTypes/ProductsType";
// A reducer accepts a state and an action and always returns a new state withiout mutating the old state.
const ProdReducer = (
  preState = {
    //default arguments
    products: [],
    product: {},
    isLoading: false,
    page: 1,
    limit: 10
  },
  action
) => {
  //creating a switch statement for different action types
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...preState,
        isLoading: preState.products.length > 0 ? false : true,
        page: action.page
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...preState,
        isLoading: false,
        products: preState.products.concat(action.products)
      };
    case SEARCH_PRODUCT:
      return {
        ...preState,
        isLoading: false,
        filteredProducts: action.products.filter(function(item) {
          return (
            item.title.toLowerCase().search(action.prodName.toLowerCase()) !==
            -1
          );
        })
      };
    default:
      return preState;
  }
};
//exporting
export default ProdReducer;
