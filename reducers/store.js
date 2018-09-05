import {
  GET_STORES,
  GET_STORES_FAILURE,
  GET_STORES_SUCCESS
} from "../actionTypes/constants";

export default (preState = { stores: [], isLoading: false }, action) => {
  switch (action.type) {
    case GET_STORES:
      return {
        ...preState,
        isLoading: true
      };
    case GET_STORES_SUCCESS:
      return {
        ...preState,
        isLoading: false,
        stores: action.stores
      };
    case GET_STORES_FAILURE:
      return {
        ...preState,
        isLoading: false,
        error: action.error
      };
    default:
      return preState;
  }
};
