import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-native";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
const Show = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  let [state, setState] = React.useState("");
  let [responseData, setResponseData] = React.useState("");
  const fetchData = () => {
    axios
      .get(`http://192.168.1.157:5000/postings/${id}`)
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
  const handleDelete = (id) => {
    axios
      .delete(`http://192.168.1.157:5000/postings/${id}`)
      .then(() => {
        setState("Posting deleted");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setState("Error: Insufficient permissions");
        } else {
          setState("Error: Unknown error occurred");
        }
      });
  };
  let type = () => {
    if (responseData.type) {
      return "Seller is ready to ship the item";
    } else {
      return "Local pickup only";
    }
  };
  if (state) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{state}</Text>
        <Link to="/">
          <Text style={styles.buttonStyle}>Continue</Text>
        </Link>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>{responseData.title}</Text>
          <Text style={styles.price}>{responseData.price} EUR</Text>
          <Text style={styles.desc}>
            Posted in the category: {responseData.category}
          </Text>
          <Text style={styles.desc}>----------</Text>
          <Text style={styles.desc}>{responseData.desc}</Text>
        </View>

        <View>
          <Image
            style={{
              resizeMode: "contain",
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{ uri: responseData.image1 }}
          />
          <Image
            style={{
              resizeMode: "contain",
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{ uri: responseData.image2 }}
          />
          <Image
            style={{
              resizeMode: "contain",
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{ uri: responseData.image3 }}
          />
          <Image
            style={{
              resizeMode: "contain",
              width: "auto",
              height: "auto",
              aspectRatio: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            source={{ uri: responseData.image4 }}
          />
        </View>
        <View>
          <Text style={styles.price}>{type()}</Text>
          <Text style={styles.price}>
            Item location: {responseData.location}
          </Text>
          <Text style={styles.desc}>
            Seller's contact details: {responseData.contact}
          </Text>
        </View>
        <View>
          <Link to="/">
            <Text style={styles.buttonStyle}>Back</Text>
          </Link>
          <Text
            style={styles.buttonStyle}
            onPress={() => handleDelete(responseData.id)}
          >
            Delete
          </Text>
          <Link to={`/edit/${id}`}>
            <Text style={styles.buttonStyle}>Edit</Text>
          </Link>
          <Text style={styles.desc}>
            Posting created: {responseData.createdAt}
          </Text>
          <Text style={styles.desc}>
            Last updated: {responseData.updatedAt}
          </Text>
        </View>
      </ScrollView>
    );
  }
};
export default Show;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
  },
  title: {
    fontSize: 32,
  },
  desc: {
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
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
});
