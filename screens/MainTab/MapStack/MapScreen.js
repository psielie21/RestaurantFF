import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Animated,
  } from "react-native";
import { NavigationEvents } from 'react-navigation';


import { MapView } from 'expo';

import MapConstants from "../../../constants/Map";
import LayoutConstants from "../../../constants/Layout";
import RestaurantScrollView from "../../../components/MapComponents/RestaurantScrollView"
import RestaurantFetchButton from "../../../components/MapComponents/RestaurantFetchButton"
import MapMarkerList from "../../../components/MapComponents/MapMarkerList";
import CurrentLocationButton from "../../../components/MapComponents/ButtonMenu/CurrentLocationButton"

import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";


export const GET_NEARBY_RESTAURANTS = gql`
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

export default class LinksScreen extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      restaurants: [],
      index : 0,
    };

    this.currRegion = {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: MapConstants.REGION_DELTAS.latitudeDelta,
      longitudeDelta: MapConstants.REGION_DELTAS.longitudeDelta,
    }

    this.latestPosition = this.getCurrentPosition();
  }
  static navigationOptions = {
    title: 'Map',
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0.01);
    console.log("MOUNTED");
  }

  handleIndexChange(index) {
    this.setState({ index })
  }

  centerMap(position){
    this.map.animateToRegion({
      ...position,
      latitudeDelta: MapConstants.REGION_DELTAS.latitudeDelta,
      longitudeDelta: MapConstants.REGION_DELTAS.longitudeDelta,
    }, 350);
  }

  getCurrentPosition(){
    return {
      coords: this.currRegion.longitude + ", " + this.currRegion.latitude,
      lat1: (this.currRegion.latitude - this.currRegion.latitudeDelta/2),
      lon1: (this.currRegion.longitude - this.currRegion.longitudeDelta/2),
      lat2: (this.currRegion.latitude + this.currRegion.latitudeDelta/2),
      lon2: (this.currRegion.longitude + this.currRegion.longitudeDelta/2),
    }
  }

  handleScreenConstraints(){
    //this checks if the screen is broader than we like it to be
    //instead of querying too much data we zoom in a little bit
    if(this.currRegion.latitudeDelta > 2*MapConstants.REGION_DELTAS.latitudeDelta || this.currRegion.longitudeDelta > 2*MapConstants.REGION_DELTAS.longitudeDelta){
      this.map.animateToRegion(
        {
          latitude: this.currRegion.latitude,
          longitude: this.currRegion.longitude,
          latitudeDelta: MapConstants.REGION_DELTAS.latitudeDelta,
          longitudeDelta: MapConstants.REGION_DELTAS.longitudeDelta,
        },
        350);
        return {
          lat1: (this.currRegion.latitude - MapConstants.REGION_DELTAS.latitudeDelta/2),
          lon1: (this.currRegion.longitude -  MapConstants.REGION_DELTAS.longitudeDelta/2),
          lat2: (this.currRegion.latitude + MapConstants.REGION_DELTAS.latitudeDelta/2),
          lon2: (this.currRegion.longitude +  MapConstants.REGION_DELTAS.longitudeDelta/2),
        }
      }else {
        return this.getCurrentPosition()
      }
  }

  moveRegions(mapsObj){
    this.map.animateToRegion(mapsObj)
  }

  onFetchingError = () => this.setState(() => ({error: true}))

  onRestaurantsFetched = restaurants => this.setState(() => ({ restaurants }));

  render() {
    const { navigate } = this.props.navigation;
    

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
            if(payload.action != undefined && payload.action.type == "Navigation/POP_TO_TOP"){
              this.restaurantFetchButton.refetchManually();
            }
          }}
        />
        <MapView
          showsPointsOfInterest={false}
          ref={map => this.map = map}
          initialRegion={this.currRegion}
          style={styles.container}
          showsUserLocation={true}
          onRegionChange={e => this.currRegion = e}>

          <MapMarkerList markers={this.state.restaurants}  index={this.state.index}/>
        
        </MapView>
        <View>      
          <RestaurantScrollView markers={this.state.restaurants}
                                onRef={(ref) => { this.restaurantScrollView = ref }}
                                navigate={navigate}
                                animateToRegion={this.moveRegions.bind(this)}
                                handleIndexChange={this.handleIndexChange.bind(this)}
                                animation={this.animation}/>
          <View style={styles.button}>
              <CurrentLocationButton centerMap={this.centerMap.bind(this)} />
              <ApolloConsumer>
                {client => (
                  <RestaurantFetchButton handleRefetch={async () => {
                    const currLocation = this.handleScreenConstraints();
                    this.setState(() => ({loading: true}) );
                    try {
                      const { data } = await client.query({
                        query: GET_NEARBY_RESTAURANTS,
                        variables: currLocation
                      });
                      //write to local apollo store if data has changed
                      const latestLocation = JSON.stringify(currLocation);
                      client.writeData({ data: { latestQuery: latestLocation }});
                      this.onRestaurantsFetched(data.getBoxBasedRestaurants);
                      this.setState(() => ({loading: false}) );
                    } catch (e){
                      Alert.alert("An error ocurred - please try again later");
                      this.setState(() => ({loading: false}) );
                    }
                  }}
                  fetching={this.state.loading}
                  onRef={fetchButton => this.restaurantFetchButton = fetchButton}/>
                )}
                
              </ApolloConsumer>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rec: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  cardImage: {
    flex: 1,
    width: 30,
    height: 30,
    //alignSelf: "center",
    //resizeMode: "cover"
  },
  textContent: {
    marginLeft: 5,
    marginBottom: 4,
    flex: 4,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  testTry: {
    backgroundColor: "black",
    height: 20,
    width: 20,
    borderRadius: 12,

  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,195,150, 0.9)",
    position: "absolute"
  },
  ring: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
    },
  button: {
    position: "absolute",
    bottom: 30 + LayoutConstants.CARD_HEIGHT + 30,
    right: 30,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b4187",
    elevation: 5
  },
});
