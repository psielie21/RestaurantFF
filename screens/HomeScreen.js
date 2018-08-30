import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  View,
} from 'react-native';

import data from "../data.js";


const { width, height } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: "Profil",
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{uri: data.getNearbyRecommendations[0].recommendations[0].author.avatar}}/>
          </View>
          
          <View style={styles.table}>
            <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Email: </Text><Text style={styles.email}>car.kneissl@gmail.com</Text></Text></View>
            <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Benutzername: </Text><Text style={styles.username}>kneis_car</Text></Text></View>
            <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Bewertungen: </Text><Text style={styles.recCount}>42</Text></Text></View>
            <View styles={styles.row}><Text style={styles.wrapperText}><Text style={styles.firstCol}>Mitglied seit: </Text><Text style={styles.since}>04.02.00</Text></Text></View>
          </View>
          
          <Button title="Ausloggen" color={"red"}></Button>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height/3,
    padding: 30,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  img: {
    height: 100,
    width: 100
  },
  table: {
    marginTop: 30,
    padding: 10
  },
  wrapperText: {
    fontSize: 18,
  },
  firstCol: {

  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "blue"
  }
});
