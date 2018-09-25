import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from "react-native";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Restaurant from "../../../components/Restaurant";
import LocationButton from "../../../components/LocationButton";
import data from "../../../data";

const GET_RESTAURANTS_BY_NAME_QUERY = gql`
query Restaurants($name: String!){
  getRestaurants(name: $name) {
    _id
    type
    name
    adress
    city
    zip
  }
}
`;

const GET_RESTAURANTS_BY_LOCATION_QUERY = gql`
query Restaurants($coords: String!){
  getRestaurants(coords: $coords) {
    _id
    type
    name
    adress
    city
    zip
  }
}
`;


     

class CreateScreen extends React.Component {
    static navigationOptions = {
        title: 'Create',
      };

    constructor(props){
      super(props);
      this.state = {
        restaurants: data.getNearbyRecommendations,
        text: "",
        loading: false
      }
    }

    renderResults(){
      const { navigate } = this.props.navigation
      if(this.props.data.loading){
        return <ActivityIndicator size="large" color="#0000ff" />
      }else if( (!this.props.data.getRestaurants || this.props.data.getRestaurants.length == 0) && this.state.restaurants.length == 0  ){
        return (
          <View style={styles.textContainer}>
            <Text style={styles.infoText}>Suchen sie nach Restaurants oder fügen sie neue in das System ein!</Text>
            <TouchableOpacity onPress={() => navigate("AddRest")}>
              <MaterialIcons name="add" size={40}/>
            </TouchableOpacity>
          </View>
        )
      }else if(!this.props.data.getRestaurants){
        {this.state.restaurants.map((elem, index) => {
          return(
            <TouchableOpacity key={elem._id} onPress={() => { navigate("SecondStep", elem) }}>
              <Restaurant rest={elem}/>
            </TouchableOpacity>
          )})
        }
      }else {
        return (
          <ScrollView>
            {this.props.data.getRestaurants.concat(this.state.restaurants).map((elem, index) => {
              return(
                <TouchableOpacity key={elem._id} onPress={() => { navigate("SecondStep", elem) }}>
                  <Restaurant rest={elem}/>
                </TouchableOpacity>
              )})
            }
          </ScrollView> 
        )
      }
    }
    
    

    render(){
      
        return (
          <View style={styles.root}>
            <View style={styles.root}>
              <View style={styles.inputContainer}>
                <TextInput 
                  style= {styles.input}
                  placeholder="Restaurants suchen..."
                  onChangeText={ text => {
                    this.setState({ text, restaurants: [] })
                    this.props.data.refetch({ name: text })
                  }}
                />
                <LocationButton handleData={(data) =>  {
                  console.log(data)
                  this.setState({ restaurants: data.data.getRestaurants });
                  }} query={ GET_RESTAURANTS_BY_LOCATION_QUERY }>
                  <EvilIcons style={styles.icon}
                      name="location" size={30}
                  />  
                </LocationButton>
              </View>

              <View style={styles.component}>
              {
                this.renderResults()
              }
            </View>
          </View>             
        </View>
            
        )
    }
}

export default graphql(GET_RESTAURANTS_BY_NAME_QUERY, {
  options: (props) => ({
    variables: {
      name: ""
    },
  }),
})(CreateScreen)

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