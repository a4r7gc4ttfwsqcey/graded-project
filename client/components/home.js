import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, Alert } from 'react-native';
import {Redirect, Link} from 'react-router-native'
import List from './list';


const Home = () => {
    const loggedIn = useSelector(state => state.auth)
    const [isGuest, setIsGuest] = useState(false)
    const handleGuest = () => {
        setIsGuest(true)
      }
      if(loggedIn || isGuest){
          return(<View style={styles.container}><List /></View>)
      } else {
        return (
            <View style={styles.container}>
              <Text>LocalMarket</Text>
              <Text>Sell and buy items easily in your hometown</Text>
              <Text style={styles.buttonStyle} onPress={() => Alert.alert("Account reminder", "Some features might be limited. Continue without an account?", [
              {text: "Proceed", onPress: () => handleGuest()},
              {text: "Go back"}
            ]
            )}>BROWSE ITEMS AS A GUEST</Text>
              <Link to="/login"><Text style={styles.buttonStyle}>MAKE A NEW ACCOUNT</Text></Link>
              <Link to="/login"><Text style={styles.buttonStyle}>LOG IN</Text></Link>
            </View>
          )
      }

  }
  export default Home;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
        color: 'white',
        fontWeight: "500",
        padding: 10,
        margin: 5,
        elevation: 4,
        textAlign: 'center',
        borderRadius: 2,
        backgroundColor: '#2196F3'
        }
  });