import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Switch,
  Alert,
} from "react-native";
import axios from "axios";
import { authenticate } from "../actions";
import { useParams, Link } from "react-router-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const Edit = () => {
  const { id } = useParams();
  let [responseData, setResponseData] = React.useState("");
  const fetchData = () => {
    axios
      .get(`http://192.168.1.157:5000/postings/${id}`)
      .then((res) => {
        setResponseData(res.data);
      })
      .catch((err) => {
        console.log(err);
        onSetStatus("Error: Unknown error occurred");
      });
  };
  if (responseData == "" || responseData == null) {
    fetchData();
  }
  const [status, onSetStatus] = React.useState("");
  const [type, setType] = useState(false);
  const toggleSwitch = () => setType((previousState) => !previousState);
  const [title, onChangeTitle] = React.useState("");
  const [desc, onChangeDesc] = React.useState("");
  const [category, onChangeCategory] = React.useState("");
  const [location, onChangeLocation] = React.useState("");
  const [price, onChangePrice] = React.useState(0);
  const [pricestr, onChangePriceStr] = React.useState("");
  const [contact, onChangeContact] = React.useState("");
  const [image1, onUpdateImage1] = React.useState("");
  const [image2, onUpdateImage2] = React.useState("");
  const [image3, onUpdateImage3] = React.useState("");
  const [image4, onUpdateImage4] = React.useState("");
  const setOlddata = () => {
    setType(responseData.type);
    onChangeTitle(responseData.title);
    onChangeDesc(responseData.desc);
    onChangeCategory(responseData.category);
    onChangeLocation(responseData.location);
    onChangePrice(responseData.price);
    onChangePriceStr(responseData.price.toString());
    onChangeContact(responseData.contact);
    onUpdateImage1(responseData.image1);
    onUpdateImage2(responseData.image2);
    onUpdateImage3(responseData.image3);
    onUpdateImage4(responseData.image4);
  };
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
  const handlePatch = () => {
    axios
      .patch(`http://192.168.1.157:5000/postings/${id}`, {
        title,
        desc,
        category,
        location,
        image1,
        image2,
        image3,
        image4,
        price,
        type,
        contact,
      })
      .then((res) => {
        onSetStatus("Edit successful");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          onSetStatus("Error: Insufficient permissions");
        } else if (err.response.status == 400) {
          onSetStatus("Error: Invalid input");
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
        <Text>Edit posting</Text>
        <Text style={styles.buttonStyle} onPress={() => setOlddata()}>
          Fill with existing data
        </Text>
        <View>
          <Text>Title</Text>
          <TextInput
            style={styles.textinput}
            value={title}
            onChangeText={(title) => onChangeTitle(title)}
          />
          <Text>Description</Text>
          <TextInput
            multiline={true}
            value={desc}
            style={styles.textinputlarge}
            onChangeText={(desc) => onChangeDesc(desc)}
          />
          <Text>Category (e.g. Fashion, Electronics, Books, ...)</Text>
          <TextInput
            style={styles.textinput}
            value={category}
            onChangeText={(category) => onChangeCategory(category)}
          />
          <Text>Location (e.g. Oulu)</Text>
          <TextInput
            style={styles.textinput}
            value={location}
            onChangeText={(location) => onChangeLocation(location)}
          />
          <Text>New asking price in Euros (€)</Text>
          <TextInput
            style={styles.textinput}
            textContentType={"oneTimeCode"}
            value={pricestr}
            onChangeText={(price) => onChangePrice(price)}
          />
          <Text>Contact details (Publicly shown)</Text>
          <TextInput
            style={styles.textinput}
            value={contact}
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
          <Text>Update images</Text>
          <TextInput
            style={styles.textinput}
            value={image1}
            onChangeText={(image1) => onUpdateImage1(image1)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(1)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            value={image2}
            onChangeText={(image2) => onUpdateImage2(image2)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(2)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            value={image3}
            onChangeText={(image3) => onUpdateImage3(image3)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(3)}>
            Choose from gallery
          </Text>
          <TextInput
            style={styles.textinput}
            value={image4}
            onChangeText={(image4) => onUpdateImage4(image4)}
            placeholder="Enter URL or Pick an Image"
          />
          <Text style={styles.buttonStyle} onPress={() => processImage(4)}>
            Choose from gallery
          </Text>
        </View>
        <Text style={styles.buttonStyle} onPress={() => handlePatch()}>
          SAVE CHANGES
        </Text>
        <Link to="/">
          <Text style={styles.buttonStyle}>Cancel</Text>
        </Link>
      </ScrollView>
    );
  }
};
export default Edit;
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
