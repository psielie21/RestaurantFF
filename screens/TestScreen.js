import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, TextInput,ScrollView } from "react-native";
import {  FlatList,  } from "react-native-gesture-handler";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";

import Restaurant from "../components/Restaurant";

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
  ]

  const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

export default class TestScreen extends React.Component {
    static navigationOptions = {
        title: 'Test',
      };

    constructor(props){
      super(props);
      this.state = {results: []}
      
    }
    
    _tick = () => {
      if(this.state.results.length == 0){
        this.setState({results: ["Hello"]})
      }else {
        this.setState({results: []})
      }
      
    }
    

    render(){
      const { navigate } = this.props.navigation
        return (
          <View style={styles.root}>
            <View style={styles.inputContainer}>
              <TextInput 
                style= {styles.input}
                placeholder="Restaurants suchen..."
              />
              <TouchableOpacity style={styles.button} onPress={this._tick}>
                  <EvilIcons style={styles.icon}
                      name="location" size={30}
                    />                
              </TouchableOpacity>
            </View>
            <View style={styles.component}>
              {this.state.results.length == 0 &&
                <View style={styles.textContainer}>
                  <Text style={styles.infoText}>Suchen sie nach Restaurants oder fügen sie neue in das System ein!</Text>
                  <TouchableOpacity>
                    <MaterialIcons name="add" size={40}>

                    </MaterialIcons>
                  </TouchableOpacity>
                </View>
              }
              <ScrollView>
                <TouchableOpacity onPress={() => {
                  navigate("SecondStep", {name: "Poinger Einkehr", adress: "Am Sportplatz 44", zip: "85586", city: "Poing"})
                }}>
                    <Restaurant rest={{name: "Poinger Einkehr", adress: "Am Sportplatz 44", zip: "85586", city: "Poing"}}/>
                  </TouchableOpacity>
              
              <Restaurant rest={{name: "Poinger Einkehr", adress: "Am Sportplatz 44", zip: "85586", city: "Poing"}}/>
              <Restaurant rest={{name: "Poinger Einkehr", adress: "Am Sportplatz 44", zip: "85586", city: "Poing"}}/>
                </ScrollView>
              
            </View>
          </View>
            
        )
    }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    flex: 7,
  },
  button: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  component: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    padding: 0
  },
  textContainer: {
    margin: 50,
    display: "flex",
    justifyContent: "center",
  },
  infoText: {
    fontWeight: "400",
  },
})