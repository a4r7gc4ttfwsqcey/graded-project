import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
} from "react-native";
import axios from "axios";
import { authenticate } from "../actions";
import { Link } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const New = () => {
  const [status, onSetStatus] = React.useState("");
  const [type, setType] = useState(false);
  const toggleSwitch = () => setType((previousState) => !previousState);
  const [title, onChangeTitle] = React.useState("");
  const [desc, onChangeDesc] = React.useState("");
  const [category, onChangeCategory] = React.useState("");
  const [location, onChangeLocation] = React.useState("");
  const [price, onChangePrice] = React.useState(0);
  const [contact, onChangeContact] = React.useState("");
  const [image1, onUpdateImage1] = React.useState("");
  const [image2, onUpdateImage2] = React.useState("");
  const [image3, onUpdateImage3] = React.useState("");
  const [image4, onUpdateImage4] = React.useState("");
  const processImage = async (number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (number == 1) {
      onUpdateImage1("data:image/png;base64," + result.base64);
    } else if (number == 2) {
      onUpdateImage2("data:image/png;base64," + result.base64);
    } else if (number == 3) {
      onUpdateImage3("data:image/png;base64," + result.base64);
    } else if (number == 4) {
      onUpdateImage4("data:image/png;base64," + result.base64);
    } else {
      console.log("error");
    }
  };
  const handlePost = () => {
    axios
      .post(`http://192.168.1.157:5000/posting`, {
        title,
        desc,
        category,
        location,
        image1,
        image2,
        image3,
        image4,
        price,
        contact,
        type,
      })
      .then((res) => {
        onSetStatus("Posting created");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          onSetStatus("Error: You need an account to create postings");
        } else {
          onSetStatus("Error: Unknown error occurred");
        }
      });
  };
  if (status) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{status}</Text>
        <Link to="/">
          <Text style={styles.buttonStyle}>Continue to app</Text>
        </Link>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text>Create posting</Text>
        <View>
          <Text>Title</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(title) => onChangeTitle(title)}
          />
          <Text>Description</Text>
          <TextInput
            multiline={true}
            style={styles.textinputlarge}
            onChangeText={(desc) => onChangeDesc(desc)}
          />
          <Text>Category (e.g. Fashion, Electronics, Books, ...)</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(category) => onChangeCategory(category)}
          />
          <Text>Location (e.g. Oulu)</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(location) => onChangeLocation(location)}
          />
          <Text>Asking price in Euros (€)</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(price) => onChangePrice(price)}
          />
          <Text>Contact details (Publicly shown)</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(contact) => onChangeContact(contact)}
          />
        </View>
        <View>
          <Text>I am ready to ship the item to the recipient</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={type ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={type}
          />
        </View>
        <View>
          <Text>Add some images?</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(image1) => onUpdateImage1(image1)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(1)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(image2) => onUpdateImage2(image2)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(2)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(image3) => onUpdateImage3(image3)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(3)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(image4) => onUpdateImage4(image4)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(4)}>
            Choose from gallery
          </Text>
        </View>
        <Text style={styles.buttonStyle} onPress={() => handlePost()}>
          CREATE
        </Text>
      </ScrollView>
    );
  }
};
export default New;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    margin: 5,
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
  textinput: {
    height: 30,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
  },
  textinputlarge: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
  },
});
