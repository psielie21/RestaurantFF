import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableNativeFeedback,
    ActivityIndicator,
} from "react-native";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Entypo } from "@expo/vector-icons";


const GET_NEARBY_RESTAURANTS = gql`
  query GetNearbyRestaurants($coords: String, $distance: Float, $lat1: Float, $lon1: Float, $lat2: Float, $lon2: Float){
    getBoxBasedRestaurants(lat1: $lat1, lon1: $lon1, lat2: $lat2, lon2: $lon2){
      name
      _id
      recommendations {
        _id
      }
      location {
        latitude
        longitude
      }
    }
    getNearbyRecommendations(coords: $coords, distance: $distance){
      name
      _id
      location {
        latitude
        longitude
      }
      adress
      city
      zip
      recommendations {
        body
        createdAt
        rating
        author {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

export default class RestaurantFetchButton extends Component {


  render(){
    return (
      <View>
        <ApolloConsumer>
          {client => (
            <View>
              <TouchableNativeFeedback onPress={async() => {
                const variables = this.props.getArgumentsForQuery();
                this.props.handleScreenConstraints();
                this.props.onStartFetchingResults();
                const data = await client.query({
                      query: GET_NEARBY_RESTAURANTS,
                      variables
                    });
                this.props.onEndFetchingResults();
                this.props.onCompletedFetching(data.data);

                  }
                } >
                <Entypo name={"magnifying-glass"} size={35} style={{
                  padding: 7,
                  color: "#FFF5EE"
                 }}/>
              </TouchableNativeFeedback>
              {this.props.fetching &&
                <ActivityIndicator  size="large" color="#00ff00" />
              }
            </View>
          )}
        </ApolloConsumer>
      </View>
    )
  }
}
