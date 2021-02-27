import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-native";
import { View, Text, Image } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
const View = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  console.log(id);
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
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <Text>{responseData}</Text>
      <Link to="/">
        <Text style={styles.buttonStyle}>Back</Text>
      </Link>
      <Text style={styles.buttonStyle} onPress={() => handleDelete()}>
        Delete
      </Text>
      <Text style={styles.buttonStyle} onPress={() => handleEdit()}>
        Edit
      </Text>
    </View>
  );
};
export default View;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
