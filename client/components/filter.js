import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-native";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Text, RadioButton, TextInput } from "react-native-paper";

import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
const Filter = () => {
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
  const [state, setState] = useState("search");
  const [category, onChangeCategory] = useState("");
  const [location, onChangeLocation] = useState("");
  const [checked, setChecked] = useState("");
  let [responseData, setResponseData] = React.useState("");
  const handleQuery = () => {
    axios
    .get(`http://192.168.1.157:5000/search?category=${category}&location=${location}&date=${checked}`)
    .then((res) => {
      setResponseData(res.data);
      setState('list')
    })
    .catch((err) => {
      console.log(err);
    });
};
const renderItem = ({ item }) => (
    <Item
      title={item.title}
      price={item.price}
      image1={item.image1}
      id={item.id}
    />
  );
  if (state == "search") {
    return (
      <View style={styles.container}>
        <Link to="/">
          <Text style={styles.logoStyle}>LocalMarket</Text>
        </Link>
        <View>
          <Text>Filter by:</Text>
          <Text>Category</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(category) => onChangeCategory(category)}
          />
          <Text>Location</Text>
          <TextInput
            multiline={true}
            style={styles.textinput}
            onChangeText={(location) => onChangeLocation(location)}
          />
          <Text>Create date</Text>
          <View style={styles.radio}>
            <Text style={styles.radiotext}>Show all</Text>
            <RadioButton
              value=""
              status={checked === "" ? "checked" : "unchecked"}
              onPress={() => setChecked("")}
            />
          </View>
          <View style={styles.radio}>
            <Text style={styles.radiotext}>From today</Text>
            <RadioButton
              value="1"
              status={checked === "1" ? "checked" : "unchecked"}
              onPress={() => setChecked("1")}
            />
          </View>
          <View style={styles.radio}>
            <Text style={styles.radiotext}>From the last 7 days</Text>
            <RadioButton
              value="7"
              status={checked === "7" ? "checked" : "unchecked"}
              onPress={() => setChecked("7")}
            />
          </View>
          <View style={styles.radio}>
            <Text style={styles.radiotext}>From the last 30 days</Text>
            <RadioButton
              value="30"
              status={checked === "30" ? "checked" : "unchecked"}
              onPress={() => setChecked("30")}
            />
          </View>
        </View>
        <Text style={styles.buttonStyle} onPress={() => handleQuery()}>
          Execute search query
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Link to="/">
          <Text style={styles.logoStyle}>LocalMarket</Text>
        </Link>
        <Text style={styles.radiotext}>Only postings that match the filter are visible</Text>
        <Link to="/">
          <Text style={styles.buttonStyle}>Show all</Text>
        </Link>
        <Link to="/filter">
          <Text style={styles.buttonStyle}>Adjust filter options</Text>
        </Link>
        <View>
            <FlatList
            data={_.values(responseData)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </View>
      </View>
    );
  }

};
export default Filter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 5,
  },
  buttonStyle: {
    color: "white",
    fontWeight: "500",
    padding: 10,
    margin: 5,
    elevation: 4,
    textAlign: "center",
    borderRadius: 2,
    backgroundColor: "#2196F3",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  radio: {
    flexDirection: "row",
    marginLeft: 5,
  },
  radiotext: {
    marginVertical: 7.5,
  },
  logoStyle: {
    color: "blue",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  textinput: {
    height: 30,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
  },
});
