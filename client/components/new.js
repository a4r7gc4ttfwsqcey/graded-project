import React from "react";
import { TextInput, View, StyleSheet, FlatList, Text } from "react-native";
import axios from "axios";
import { authenticate } from "../actions";
import { Link } from "react-router-native";
const New = () => {
  const [title, onChangeTitle] = React.useState("Title");
  const handlePost = () => {};
  return (
    <View style={styles.container}>
      <Text>{status}</Text>
      <Text>Title</Text>
      <TextInput
        style={{
          height: 40,
          width: "90%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(title) => onChangeTitle(title)}
        value={title}
      />
      <Text style={styles.buttonStyle} onPress={() => handlePost()}>
        CREATE
      </Text>
    </View>
  );
};
export default New;
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
