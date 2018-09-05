//imports
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppWithNavigation, { middleware } from "./screens/AppNavigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { productWatchers } from "./sagas/ProductsSaga";

//create a saga middleware using the factory function createSagaMiddleware exported by the redux-saga library
const sagaMiddleware = createSagaMiddleware();

//// mount it on the Store
const store = createStore(
  rootReducer,
  {
    productState: {
      products: [],
      product: {},
      isLoading: false,
      page: 1,
      limit: 10,
      filteredProducts: []
    },
    storeState: { stores: [], isLoading: false }
  },
  applyMiddleware(middleware, sagaMiddleware)
);
// then run the saga
sagaMiddleware.run(productWatchers);

export default class Root extends React.Component {
  // render the application
  render() {
    return (
      // Provider attaches app to store
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}
