import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import data from "../data";
import VideoItem from "../components/VideoItem"
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { MapView, Permissions, Location } from 'expo';
import MapConstants from "../constants/Map";



const GET_NEARBY_RESTAURANTS = gql`
  query GetNearbyRestaurants($lat1: Float, $lon1: Float, $lat2: Float, $lon2: Float){
    getBoxBasedRestaurants(lat1: $lat1, lon1: $lon1, lat2: $lat2, lon2: $lon2){
      name
      _id
      adress
      zip
      city
      recommendations {
        _id
        createdAt
        rating
        body
        author {
          avatar
          firstName
          lastName
          username
        }
      }
      location {
        latitude
        longitude
      }
    }
  }
`;

export default class YouTubeScreen extends React.Component {
    constructor(){
        super();
        //this._getLocationAsync();
        this.state = {
            location: {
                "latitude": 48.5671474,
                "longitude": 13.4630372,
        }}
        setTimeout(() => this.setState({
            location: {
                "latitude": 48.3671474,
                "longitude": 13.4630372,
            }
        }), 5000);
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        console.log(this.state.location);
      };

    render() {

        return(
            <View style={styles.body}>
                <Query query={GET_NEARBY_RESTAURANTS} variables={{
                    lat1: (this.state.location.latitude - MapConstants.REGION_DELTAS.latitudeDelta/2),
                    lon1: (this.state.location.longitude - MapConstants.REGION_DELTAS.longitudeDelta/2),
                    lat2: (this.state.location.latitude + MapConstants.REGION_DELTAS.latitudeDelta/2),
                    lon2: (this.state.location.longitude + MapConstants.REGION_DELTAS.longitudeDelta/2),
                    }}>
                    {({ data, loading }) => {
                        console.log("Fired");
                        if(loading) return <Text>Loading</Text>
                        return <Text>{data.getBoxBasedRestaurants[0].name}</Text>
                    }}
                </Query>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {

    }
})