import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import _ from "lodash";
import axios from "axios";
import { Link } from "react-router-native";

const Item = ({ id, title, price, image1 }) => (
  <Link to={`/show/${id}`}>
    <View style={styles.item}>
      <View style={{ marginHorizontal: 10 }}>
        <Image
          style={{
            width: 75,
            height: 75,
            borderWidth: 1,
            borderColor: "black",
          }}
          source={{ uri: image1 }}
        />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.price}>{price} EUR</Text>
      </View>
    </View>
  </Link>
);
const List = () => {
  let [responseData, setResponseData] = React.useState("");
  const fetchData = () => {
    axios
      .get(`http://192.168.1.157:5000/search`)
      .then((res) => {
        setResponseData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      price={item.price}
      image1={item.image1}
      id={item.id}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={_.values(responseData)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
