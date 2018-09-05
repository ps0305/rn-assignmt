//importing modules
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// importing icons from expo/vector-icons
import { FontAwesome, Ionicons } from "@expo/vector-icons";

// creating class ProductListItem and extends it from React.component
class ProductListItem extends React.PureComponent {
  render() {
    //destructuring
    let { id, image, title, navigation, price, rating } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({ id });
        }}
      >
        <View style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.infoContainer}>
              <Text
                style={[styles.title, { flexShrink: 1, overflow: "hidden" }]}
              >
                {title}
              </Text>
            </View>
            <View style={styles.rating}>
              <Text style={{ color: "#aaa9a8", marginRight: 4 }}>{rating}</Text>
              <Ionicons name="md-star" size={14} color="#fff" />
            </View>
            <View style={styles.price}>
              <FontAwesome name="rupee" size={16} color="#aaa9a8" />
              <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
//styleSheet creation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 140,
    margin: 10
  },
  title: {
    color: "black",
    marginRight: 8,
    marginLeft: 8,
    fontSize: 12
  },
  image: {
    width: 110,
    height: 110
  },
  infoContainer: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between"
  },
  rating: {
    borderRadius: 5,
    backgroundColor: "#0040ff",
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 8,
    paddingLeft: 5,
    paddingRight: 5
  }
});

//exporting
export default ProductListItem;
