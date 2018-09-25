import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Animated,
  ActivityIndicator,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";

import { MapView, Permissions, Location } from 'expo';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Entypo } from "@expo/vector-icons";

import  data  from "../../../data";
import Card from "../../../components/ThumbnailCard";
import RestaurantMarker from "../../../components/RestaurantMarker";


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
`

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

const REGION_DELTAS = {
  latitudeDelta: 0.01864195044303443,
  longitudeDelta: 0.010142817690068,
}

export default class LinksScreen extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      testPolygon: [],
      markers: data.getNearbyRecommendations,
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.01864195044303443,
        longitudeDelta: 0.010142817690068,
      },
    };

    this.currRegion = {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
    }

  }
  static navigationOptions = {
    title: 'Map',
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0.01);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      //console.log(value);
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { location } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...location,
              latitudeDelta: REGION_DELTAS.latitudeDelta,
              longitudeDelta: REGION_DELTAS.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  async _searchNearby(data){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert("GPS benötigt für die Karte")
      return;
    }
    this.setState({
      markers: data.getBoxBasedRestaurants.concat(data.getNearbyRecommendations)
    })
  }

  onRegionChange(region) {
    this.currRegion = region;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          onRegionChange={e => this.currRegion = e}
          onLongPress={e => this.setState({
            centerPos: e.nativeEvent.coordinate,
          })
        }>
        {this.state.testPolygon.length != 0 &&
          <View>
            <MapView.Polygon coordinates={ this.state.testPolygon }/>
          </View>
        }
        {this.state.userPos &&
          <MapView.Marker coordinate={this.state.userPos}/>
        }
        {this.state.centerPos &&
          <MapView.Marker coordinate={this.state.centerPos} >
            <View style={{ backgroundColor: "blue", height: 5, width: 5, borderRadius: 12,  borderWidth: 1 }} />
          </MapView.Marker>
        }
        
        
        {this.state.markers.map((marker, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
          ];
          const scale = this.animation.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: "clamp",
          });
          const opacity = this.animation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: "clamp",
          });
          const scaleStyle = {
            transform: [
              {
                scale: scale,
              },
            ],
          };
          return (
            //<RestaurantMarker keyProp={index} location={marker.location} opacity={opacity} scaleStyle={scaleStyle}/>
            <MapView.Marker onPress={() => this.scrollView.getNode().scrollTo({x: index * (CARD_WIDTH+20),animated: true}) } coordinate={marker.location} >
              <View style={{ backgroundColor: "red", height: 5, width: 5, borderRadius: 12, borderColor: "black", borderWidth: 1 }} />
            </MapView.Marker>

          );
        })}
        </MapView>
        <Animated.ScrollView
            ref={ref => this.scrollView = ref}
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={true}
            snapToInterval={CARD_WIDTH+20}
            pagingEnabled={true}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation
                    },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
              {this.state.markers.map((marker, index) => (
                <Card marker={marker} key={marker._id} count={marker.recommendations.length} callback={() => navigate("Details", marker)}/>
              ))  
            }
          </Animated.ScrollView>


          <View style={styles.button}>
            <View>
              <TouchableNativeFeedback  onPress={async() => {
                let location = await Location.getCurrentPositionAsync({});
                this.setState(() => ({
                  userPos: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                  }
                }))
                this.map.animateToRegion(
                  {
                    ...this.state.userPos,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                  },
                  350
                );
                }}>
                <Entypo name={"compass"} size={35} style={styles.icon}/>     
              </TouchableNativeFeedback>
            </View>

            <Query query={GET_NEARBY_RESTAURANTS } onCompleted={ (data) => this._searchNearby(data)}>
              {({ loading, error, data, refetch, networkStatus}) => (
                <View>
                  <TouchableNativeFeedback onPress={() => {
                    this.setState(() => ({
                      centerPos: {
                        latitude: this.currRegion.latitude,
                        longitude: this.currRegion.longitude,
                      }
                    }));
                    //this checks if the screen is broader than we like it to be
                    //instead of querying too much data we zoom in a little bit
                    if(this.currRegion.latitudeDelta > REGION_DELTAS.latitudeDelta || this.currRegion.longitudeDelta > REGION_DELTAS.longitudeDelta){
                      this.map.animateToRegion(
                        {
                          latitude: this.currRegion.latitude,
                          longitude: this.currRegion.longitude,
                          latitudeDelta: REGION_DELTAS.latitudeDelta,
                          longitudeDelta: REGION_DELTAS.longitudeDelta,
                        },
                        350);
                      refetch({ coords: this.currRegion.longitude + ", " + this.currRegion.latitude, 
                            lat1: (this.currRegion.latitude - REGION_DELTAS.latitudeDelta/2),
                            lon1: (this.currRegion.longitude - REGION_DELTAS.longitudeDelta),
                            lat2: (this.currRegion.latitude + REGION_DELTAS.latitudeDelta/2),
                            lon2: (this.currRegion.longitude + REGION_DELTAS.longitudeDelta),
                          });
                      this.setState(() => ({
                            testPolygon: [{latitude: this.currRegion.latitude - REGION_DELTAS.latitudeDelta/2, 
                                          longitude: this.currRegion.longitude - REGION_DELTAS.longitudeDelta,},
                                          {latitude: this.currRegion.latitude - REGION_DELTAS.latitudeDelta/2, 
                                          longitude: this.currRegion.longitude + REGION_DELTAS.longitudeDelta,},
                                          {latitude: this.currRegion.latitude + REGION_DELTAS.latitudeDelta/2, 
                                          longitude: this.currRegion.longitude + REGION_DELTAS.longitudeDelta,},
                                          {latitude: this.currRegion.latitude + REGION_DELTAS.latitudeDelta/2, 
                                          longitude: this.currRegion.longitude - REGION_DELTAS.longitudeDelta,},  
                                        ]
                          }));
                    }else {
                      refetch({ coords: this.currRegion.longitude + ", " + this.currRegion.latitude, 
                              lat1: (this.currRegion.latitude - this.currRegion.latitudeDelta/2),
                              lon1: (this.currRegion.longitude - this.currRegion.longitudeDelta),
                              lat2: (this.currRegion.latitude + this.currRegion.latitudeDelta/2),
                              lon2: (this.currRegion.longitude + this.currRegion.longitudeDelta),
                            });
                      this.setState(() => ({
                              testPolygon: [{latitude: this.currRegion.latitude - this.currRegion.latitudeDelta/2, 
                                            longitude: this.currRegion.longitude - this.currRegion.longitudeDelta,},
                                            {latitude: this.currRegion.latitude - this.currRegion.latitudeDelta/2, 
                                            longitude: this.currRegion.longitude + this.currRegion.longitudeDelta,},
                                            {latitude: this.currRegion.latitude + this.currRegion.latitudeDelta/2, 
                                            longitude: this.currRegion.longitude + this.currRegion.longitudeDelta,},
                                            {latitude: this.currRegion.latitude + this.currRegion.latitudeDelta/2, 
                                            longitude: this.currRegion.longitude - this.currRegion.longitudeDelta,},  
                                          ]
                            }));
                    }

                    
                    
                    
                    
                    }   
                    } > 
                    <Entypo name={"magnifying-glass"} size={35} style={styles.icon}/>
                  </TouchableNativeFeedback>
                  {loading&&
                    <ActivityIndicator size="large" color="#0000ff" />
                  }
                </View>
              )}
            </Query>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH - 20,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",

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
      bottom: 30 + CARD_HEIGHT + 30,
      right: 30,
      borderRadius: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#3b4187",
      elevation: 5
    },
    icon: {
      padding: 7,
      color: "#FFF5EE"
    }
});