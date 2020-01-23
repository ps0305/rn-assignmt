import * as actionCreators from "../actions/ProductsAction";
import { GET_PRODUCTS } from "../actionTypes/ProductsType";
// Declarative Effects from redux-saga/effects
import { put, takeLatest } from "redux-saga/effects";

/*
FOR API
git clone https://github.com/baluragala/mock-retail-api.git
cd mock-retail-api
npm install
npm start
*/

const URI = "http://localhost:4000";

function* getProducts(action) {
  let products = yield fetch(
    `${URI}/products?_page=${action.page}&_limit=${action.limit}`
  ).then(data => data.json());
  yield put(actionCreators.getProductsSuccess(products));
}

export function* productWatchers() {
  /* takeLatest doesn't allow multiple Saga tasks to be fired concurrently. 
  As soon as it gets a new dispatched action, it cancels any previously-forked task (if still running). */
  yield takeLatest(GET_PRODUCTS, getProducts);
}
