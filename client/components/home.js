import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { Redirect, Link } from "react-router-native";
import { Text } from 'react-native-paper';
import List from "./list";
import axios from "axios";
const Home = () => {
  const [serverStatus, setServerStatus] = useState("Offline");
  const ServerStatus = () => {
    axios
      .get(`http://192.168.1.157:5000/`)
      .then((res) => {
        setServerStatus(res.data.message);
      })
      .catch((err) => {
        setServerStatus("Error");
      });
  };
  useEffect(() => {
    ServerStatus();
  }, []);
  const loggedIn = useSelector((state) => state.auth);
  const [isGuest, setIsGuest] = useState(false);
  const handleGuest = () => {
    setIsGuest(true);
  };
  if (loggedIn || isGuest) {
    return (
      <View style={styles.container}>
      <Link to="/">
        <Text style={styles.logoStyle}>LocalMarket</Text>
      </Link>
        <List />
        <Link to="/new">
          <Text style={styles.buttonStyle}>Create a new posting</Text>
        </Link>
        <Link to="/filter">
          <Text style={styles.buttonStyle}>Filter visible postings</Text>
        </Link>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.status}>Service status: {serverStatus}</Text>
        <Text style={styles.welcome}>LocalMarket</Text>
        <Text>Sell and buy items easily in your hometown</Text>
        <Text
          style={styles.buttonStyle}
          onPress={() =>
            Alert.alert(
              "Account reminder",
              "Some features might be limited. Continue without an account?",
              [
                { text: "Proceed", onPress: () => handleGuest() },
                { text: "Go back" },
              ]
            )
          }
        >
          BROWSE ITEMS AS A GUEST
        </Text>
        <Link to="/login">
          <Text style={styles.buttonStyle}>MAKE A NEW ACCOUNT</Text>
        </Link>
        <Link to="/login">
          <Text style={styles.buttonStyle}>LOG IN</Text>
        </Link>
      </View>
    );
  }
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: 'center',
    marginTop: 30,
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
  logoStyle: {
    color: "blue",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  status: {
    color: "red",
    fontSize: 16,
  },
  welcome: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 24,
    alignContent: "center",
    marginVertical: 25,
  },
});
