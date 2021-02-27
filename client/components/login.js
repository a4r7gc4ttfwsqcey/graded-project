import React from "react";
import { View, StyleSheet, FlatList} from "react-native";
import { Text, TextInput } from 'react-native-paper';
import axios from "axios";
import { authenticate } from "../actions";
import { Link } from "react-router-native";
const Login = () => {
  const [status, onSetStatus] = React.useState("Please login or register");
  const [username, onChangeUsername] = React.useState("Username");
  const [password, onChangePassword] = React.useState("Password");
  const handleLogin = () => {
    axios
      .post(`http://192.168.1.157:5000/login`, { username, password })
      .then((res) => {
        authenticate({ auth: res.data.auth, username: username });
        onSetStatus("Login success.");
      })
      .catch((error) => {
        onSetStatus("Error logging in. Please try again.");
      });
  };
  const handleRegister = () => {
    axios
      .post(`http://192.168.1.157:5000/register`, { username, password })
      .catch((error) => {
        onSetStatus("Network error.");
      });
    onSetStatus("Register success. You can login now.");
  };
  if (status == "Login success.") {
    return (
      <View style={styles.container}>
        <Text>{status}</Text>
        <Link to="/">
          <Text style={styles.buttonStyle}>Continue to app</Text>
        </Link>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{status}</Text>
        <Text>Username (4-32)</Text>
        <TextInput
          style={{
            height: 40,
            width: "90%",
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(username) => onChangeUsername(username)}
          value={username}
        />
        <Text>Password (8+)</Text>
        <TextInput
          style={{
            height: 40,
            width: "90%",
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(password) => onChangePassword(password)}
          secureTextEntry={true}
          value={password}
        />
        <Text style={styles.buttonStyle} onPress={() => handleRegister()}>
          REGISTER
        </Text>
        <Text style={styles.buttonStyle} onPress={() => handleLogin()}>
          LOG IN
        </Text>
      </View>
    );
  }
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
