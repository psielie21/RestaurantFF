import React from "react";
import { View, Text, StyleSheet, TextInput, Animated, TouchableOpacity, Button, ActivityIndicator} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";


const GET_ACTIVE_RESTAURANT = gql`
    {
        activeRestaurant @client
    }
    
`;

const CREATE_RECOMMENDATION = gql`
    mutation CreateRecommendation($restaurant: ID, $body: String, $rating: Int!, 
                                $pictures: [String], $restName: String, $latitude: Float, 
                                $longitude: Float ){
        createRecommendation(restaurant: $restaurant, body: $body, rating: $rating, 
            pictures: $pictures, restName: $restName, latitude: $latitude, 
            longitude: $longitude){
                _id
            }
    }
`;


export default class SecondStep extends React.Component {
    static navigationOptions = {
        title: 'Details',
      };

    constructor(props){
        super(props);
        this.state = {
            stars: 1,
            text: "",
            anim: new Animated.Value(1),
            fetching: false,
            activeRestaurant: {},
        }
    }

    onSubmit(createRecommendation){
        createRecommendation({ variables: { restaurant: this.activeRestaurant._id, body: this.state.text,
                                            rating: this.state.stars, restName: this.activeRestaurant.name,
                                            latitude: this.activeLocation.latitude,
                                            longitude: this.activeLocation.longitude } });
        this.setState({
            fetching: true,
        })
        setTimeout(() => {
            Animated.timing(this.state.anim,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start();
            this.setState({
                fetching: false
            })
        }, 2500)
    }

    render(){
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'ERROR');
        const neg = Animated.add(1, Animated.multiply(-1, this.state.anim))        

        return (
          <View style={styles.root}>
            
            <Query query={GET_ACTIVE_RESTAURANT}>
                {({ data, client }) => {
                    const activeRestaurant = client.cache.data.get(`Restaurant:${data.activeRestaurant}`);
                    this.activeRestaurant = activeRestaurant;
                    this.activeLocation = client.cache.data.get(activeRestaurant.location.id)
                    return (
                        <View>
                            <Text style={styles.title}>{ activeRestaurant.name }</Text>
                            <View style={styles.textboxContainer}>
                                <TextInput
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                multiline
                                style={styles.textbox}
                                placeholder={"Bewertung.."}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                />
                            </View>
    
                            <View style={styles.ratingContainer}>
                                <TouchableOpacity onPress={() => this.setState({stars: 1})}>
                                    {this.state.stars >=1 ? (
                                        <MaterialIcons name={"star"} size={30}/>
                                    ) : (
                                        <MaterialIcons name={"star-border"} size={30}/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({stars: 2})}>
                                    {this.state.stars >=2 ? (
                                        <MaterialIcons name={"star"} size={30}/>
                                    ) : (
                                        <MaterialIcons name={"star-border"} size={30}/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({stars: 3})}>
                                    {this.state.stars >=3 ? (
                                        <MaterialIcons name={"star"} size={30}/>
                                    ) : (
                                        <MaterialIcons name={"star-border"} size={30}/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({stars: 4})}>
                                    {this.state.stars >=4 ? (
                                        <MaterialIcons name={"star"} size={30}/>
                                    ) : (
                                        <MaterialIcons name={"star-border"} size={30}/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({stars: 5})}>
                                    {this.state.stars == 5 ? (
                                        <MaterialIcons name={"star"} size={30}/>
                                    ) : (
                                        <MaterialIcons name={"star-border"} size={30}/>
                                    )}
                                </TouchableOpacity>
                            </View>
    
                            <Mutation mutation={CREATE_RECOMMENDATION}>
                                {(createRecommendation, { loading, error }) => (
                                    <View>
                                        <Animated.View style={[styles.submitContainer, {opacity: this.state.anim}]}>
                                            <Button title="Speichern" onPress = { () => this.onSubmit(createRecommendation)}/>
                                        </Animated.View>
                                        {loading &&
                                            <Text>Loading</Text>
                                        }
                                        {error &&
                                            <Text>{console.log(error)}</Text>
                                        }
                                    </View>
                                    
                                    
                                )}
                                
                            </Mutation>
                            
    
                            <View style={styles.successContainer}>
                                {this.state.fetching &&
                                    <ActivityIndicator size="large" color="#0000ff" />
                                }
                                <Animated.View style={[styles.check, {opacity: neg}]}>
                                    <MaterialIcons name={"check"} size={30} />
                                </Animated.View>
                            </View>
                        </View>
                    )}}
            </Query>
          </View>

        )
    }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: "flex",
  },
  title: {
    fontWeight: "bold",
    fontSize: 33
  },
  textboxContainer: {
    height: 170,
    backgroundColor: '#F5FCFF',
    padding: 5,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  textbox : {
    height: 150,
    textAlignVertical: 'top',

  },
  ratingContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 40
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
