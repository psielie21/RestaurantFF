import React from "react";
import { View, Text, StyleSheet, TextInput, Animated, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import { ApolloConsumer, ApolloProvider } from 'react-apollo';
import gql from "graphql-tag";

import { MaterialIcons } from "@expo/vector-icons";

const CREATE_RECOMMENDATION = gql`
  mutation CreateRecommendation($restaurant: ID, $body: String, $pictures: [String], $restName: String, $latitude: Float, $longitude: Float){
    createRecommendation(restaurant: $restaurant, body: $body, pictures: $pictures, restName: $restName, latitude: $latitude, longitude: $longitude){
        _id
    }
  }
`

export default class SecondStep extends React.Component {
    static navigationOptions = {
        title: 'Details',
      };

    constructor(props){
        super(props);
        this.state = {
            stars: 1,  
            anim: new Animated.Value(1),
            fetching: false,
            body: "",
        }
    }


    render(){
        const { navigation } = this.props; 
        const name = navigation.getParam('name', 'ERROR');
        const _id = navigation.getParam('_id', 'ERROR');
        const latitude = navigation.getParam('latitude', 'ERROR');
        const longitude = navigation.getParam('longitude', 'ERROR');

        const neg = Animated.add(1, Animated.multiply(-1, this.state.anim))


        return (
          <View style={styles.root}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.textboxContainer}>
                <TextInput
                ref= {(el) => { this.body = el; }}
                onChangeText={(body) => this.setState({body})}
                value={this.state.body}
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

            <ApolloConsumer>
                {client => (
                    <View>
                        <Animated.View style={[styles.submitContainer, {opacity: this.state.anim}]}>
                            <Button title="Speichern" onPress = { async() => {
                                this.setState({
                                    fetching: true,
                                });
                                console.log(latitude);
                                console.log(name);
                                console.log(_id);
                                console.log(this.state.body);
                                console.log(longitude);

                                const { data } = await client.mutate({
                                    mutation: CREATE_RECOMMENDATION,
                                    variables: { restaurant: _id, restName: name, body: this.state.body, latitude, longitude }
                                })
                                Animated.timing(this.state.anim,
                                    {
                                        toValue: 0,
                                        duration: 350
                                    }
                                ).start();
                                this.setState({
                                    fetching: false
                                })
                            } }/>
                        </Animated.View>
            
                        <View style={styles.successContainer}>
                            {this.state.fetching &&
                                <ActivityIndicator size="large" color="#0000ff" />
                            }
                            <Animated.View style={[styles.check, {opacity: neg}]}>
                                <MaterialIcons name={"check"} size={30} />
                            </Animated.View>
                        </View>
                    </View>
                    
                    )
                }
            </ApolloConsumer>

            

                
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