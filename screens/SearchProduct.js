// importing modules
import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
//importing connect to create container component
import { connect } from "react-redux";
// importing bindActionCreators to wrap all the action passed to it in a dispatch call for you
import { bindActionCreators } from "redux";
// Wildcard import
import * as productActionCreators from "../actions/ProductsAction";

/*
FOR API
git clone https://github.com/baluragala/mock-retail-api.git
cd mock-retail-api
npm install
npm start
*/

let URI = "http://localhost:4000";

//creating a class based component and extending it from React component
class SearchProduct extends Component {
  constructor(props) {
    super(props);
    //binding this context for ifSearch
    this.ifSearch = this.ifSearch.bind(this);
  }
  // lifeCycle hooks Method
  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }
  //getProducts function
  getProducts = (page = 1, limit = 10) =>
    this.props.actions.getProducts(page, limit);

  renderItem = ({ index, item }) => {
    return (
      <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.title}`}
        image={`${URI}/images/${item.image}`}
        rating={item.rating}
        price={item.price}
      />
    );
  };
  //  //keyExtractor tells the list to use the ids for the react keys instead of the default key property
  keyExtractor = (item, i) => `${i}`;
  // ifSearch function
  ifSearch = prodName =>
    this.props.actions.searchProductList(this.props.products, prodName);

  render() {
    // sorting products in ascending order on the basis of rating
    this.props.filteredProducts.sort((a, b) => a.rating - b.rating);
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={this.ifSearch}
          onClearText={this.ifSearch}
        />

        {this.props.isLoading ? (
          <ActivityIndicator color="#406fb2" />
        ) : this.props.filteredProducts.length > 0 ? (
          <FlatList
            data={this.props.filteredProducts}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this.getMore}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              No Product found{" "}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
// mapStateToProps => to determine what state should i expose as Props
function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    page: state.productState.page,
    limit: state.productState.limit,
    filteredProducts: state.productState.filteredProducts
  };
}
// mapDispatchToProps => determines what action do i want on Props
function mapDispatchToProps(dispatch) {
  return {
    //bindActionCreators goes to productActionCreators and find all the actions and wrap them and call the dispatch
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}
//exporting
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProduct);
