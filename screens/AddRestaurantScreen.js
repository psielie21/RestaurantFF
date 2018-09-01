import React from "react";
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import t from "tcomb-form-native";

import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

import { MaterialIcons } from "@expo/vector-icons";

const Form = t.form.Form;

const Restaurant = t.struct({
  name: t.String,
  adress: t.String,
  zip: t.Number,
  city: t.String,
  country: t.String,
  type: t.maybe(t.String),
  website: t.maybe(t.String)
});

const ADD_RESTAURANT = gql`
  mutation AddRestaurant($name: String!, $coords: String!, $adress: String!, $zip: String!, $city: String!, $country: String!, $type: String, $website: String) {
    addRestaurant(name: $name, coords: $coords, adress: $adress, zip: $zip, city: $city, country: $country, type: $type, website: $website)  {
      _id
      type
    }
  }
`;

export default class AddRestaurantScreen extends React.Component {
    static navigationOptions = {
        title: 'Details',
      };

    constructor(props){
        super(props);
        this.state = {
            anim: new Animated.Value(1),
            fetching: false
        }
        
    }

    onSubmit(){
        const value = this._form.getValue(); // use that ref to get the form value
        if(value != null){
            Animated.timing(this.state.anim,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start();

        }
    }

    render(){
        const { navigation } = this.props; 
        const neg = Animated.add(1, Animated.multiply(-1, this.state.anim))


        return (
          <View style={styles.root}>
            <View style={styles.container}>
                <ScrollView>
                    <Form type={Restaurant} ref={c => this._form = c} options={{ auto: 'placeholders' }}/>    
                </ScrollView>
                
            </View>
            <View styles={styles.logicContainer}>
            <Mutation mutation={ADD_RESTAURANT} onCompleted={() => this.onSubmit()}>
                    {(addRestaurant, { loading, error }) => (
                        <View>
                            <Animated.View style={[styles.submitContainer, {opacity: this.state.anim}]}>
                                <Button
                                    title="Speichern"
                                    onPress={()=> {
                                    const dummy = {
                                        ...this._form.getValue(),
                                        coords: "-88.637578, 44.029584"

                                    }
                                    addRestaurant({ variables:  dummy });
                                    }}
                                >
                                </Button>                
                            </Animated.View>
                            <View style={styles.successContainer}>
                                {loading &&
                                    <Animated.View style={{ opacity: this.state.anim }}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </Animated.View>
                                }
                                
                                    
                                
                                {error &&
                                    console.log(error)
                                }
                                <Animated.View style={[styles.check, {opacity: neg}]}>
                                    <MaterialIcons name={"check"} size={30} />
                                </Animated.View>
                            </View>
                        </View>
                    )}
                </Mutation>
            </View>
          </View>
            
        )
    }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
    flex: 2
  },
  submitContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0
  },
  successContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  check: {
    borderRadius: 100,
    width: 40,
    backgroundColor: "rgb(50, 200, 70)",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    elevation: 3,
  }
})