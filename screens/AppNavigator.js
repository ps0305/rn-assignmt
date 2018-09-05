//imports
import React from "react";
//importing connect to create container component
import { connect } from "react-redux";
// imports to create Navigation
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import SeachProduct from "./SearchProduct";
import { Ionicons } from "@expo/vector-icons";
import ProductListWithFlatList from "./ProductsWithFlatList";

//creating navigation Stacks

// Product List tab
const ListStack = createStackNavigator(
  {
    ProdList: {
      screen: ProductListWithFlatList
    }
  },
  {
    initialRouteName: "ProdList",
    navigationOptions: {
      title: "Products List",
      headerStyle: {
        backgroundColor: "#b55ca3"
      },
      headerTintColor: "#ffe7dc",
      headerTitleStyle: {
        textAlign: "center"
      }
    }
  }
);

// Product Search tab
const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SeachProduct
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      title: "Search Product",
      headerStyle: {
        backgroundColor: "#b55ca3"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center"
      }
    }
  }
);

export const AppNavigator = createBottomTabNavigator(
  {
    ProdList: ListStack,
    Search: SearchStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "ProdList") {
          iconName = `ios-pricetags${focused ? "" : "-outline"}`;
        } else if (routeName === "Search") {
          iconName = `ios-search${focused ? "" : "-outline"}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#006416",
      inactiveTintColor: "#aaa9a8"
    }
  }
);

export const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navState
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.navState,
          addListener
        }}
      />
    );
  }
}
// mapStateToProps => to determine what state should i expose as Props
const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default AppWithNavigation;
