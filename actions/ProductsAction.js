//actions are plain object containing a description of an event
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  SEARCH_PRODUCT
} from "../actionTypes/ProductsType";

export function getProducts(page, limit) {
  return {
    //an action must have a type property
    type: GET_PRODUCTS,
    //properties
    page: page,
    limit: limit
  };
}

export function getProductsSuccess(products) {
  return {
    //an action must have a type property
    type: GET_PRODUCTS_SUCCESS,
    //property
    products: products
  };
}

export function getProductsFailure(error) {
  return {
    //an action must have a type property
    type: GET_PRODUCTS_FAILURE,
    //property
    error: error
  };
}

export function searchProductList(products, prodName) {
  return {
    //an action must have a type property
    type: SEARCH_PRODUCT,
    //properties
    products: products,
    prodName: prodName
  };
}
