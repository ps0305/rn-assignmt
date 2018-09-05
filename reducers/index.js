//importing modules
import { combineReducers } from "redux"; // to combine multiple reducer into a single one
import productReducer from "./ProductsReducer";
import storeReducer from "./store";
// import createNavigationReducer to combine multiple navigation
import { createNavigationReducer } from "react-navigation-redux-helpers";
import { AppNavigator } from "../screens/AppNavigator";

const navReducer = createNavigationReducer(AppNavigator);

// rootReducer => to combine multiple reducer into a single reducer
const rootReducer = combineReducers({
  productState: productReducer,
  storeState: storeReducer,
  navState: navReducer
});

//exporting
export default rootReducer;
