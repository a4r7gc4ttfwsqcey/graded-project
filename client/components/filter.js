import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-native";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
const Filter = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={styles.buttonStyle}>Continue</Text>
      </Link>
    </View>
  );
};
export default Filter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
