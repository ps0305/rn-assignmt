import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
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

class ProductListWithFlatList extends Component {
  constructor(props) {
    super(props);
  }
  // lifeCycle hooks Method
  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }

  _getProducts = (page = 1, limit = 10) => {
    this.props.actions.getProducts(page, limit);
  };

  getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  renderItem = ({ item }) => {
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

  //keyExtractor tells the list to use the ids for the react keys instead of the default key property
  keyExtractor = (item, i) => `${i}`;

  render() {
    //sorting products in descending order on the basis of price
    this.props.products.sort((a, b) => b.price - a.price);

    return (
      //SafeAreaView => to render content within the safe area boundaries of a device
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {this.props.isLoading ? (
          <ActivityIndicator color="#406fb2" />
        ) : (
          <FlatList
            data={this.props.products}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            onEndReached={this.getMore}
          />
        )}
      </SafeAreaView>
    );
  }
}
// mapStateToProps => to determine what state should i expose as Props
function mapStateToProps(state) {
  return {
    products: state.productState.products,
    page: state.productState.page,
    limit: state.productState.limit,
    isLoading: state.productState.isLoading
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
)(ProductListWithFlatList);
