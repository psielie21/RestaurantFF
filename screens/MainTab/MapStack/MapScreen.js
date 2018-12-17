import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { MapView, Permissions, Location } from 'expo';

import data  from "../../../data";
import MapConstants from "../../../constants/Map";
import LayoutConstants from "../../../constants/Layout";
import RestaurantScrollView from "../../../components/MapComponents/RestaurantScrollView"
import RestaurantMarker from "../../../components/MapComponents/RestaurantMarker";
import RestaurantFetchButton from "../../../components/MapComponents/RestaurantFetchButton"
import { Query, ApolloConsumer } from 'react-apollo';
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
      testPolygon: [],
      markers: [],
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: MapConstants.REGION_DELTAS.latitudeDelta,
        longitudeDelta: MapConstants.REGION_DELTAS.longitudeDelta,
      },
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
  }

  handleIndexChange(index) {
    this.setState({ index })
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
      }
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
  getCurrentPositionAndCenter(){
    this.setState({ centerPos: {
                        latitude: this.currRegion.latitude,
                        longitude: this.currRegion.longitude,
                      } })
  }

  setPolygonForDebug(){
    this.setState(() => ({
          testPolygon: [{latitude: this.currRegion.latitude - this.currRegion.latitudeDelta/2,
                        longitude: this.currRegion.longitude - this.currRegion.longitudeDelta/2,},
                        {latitude: this.currRegion.latitude - this.currRegion.latitudeDelta/2,
                        longitude: this.currRegion.longitude + this.currRegion.longitudeDelta/2,},
                        {latitude: this.currRegion.latitude + this.currRegion.latitudeDelta/2,
                        longitude: this.currRegion.longitude + this.currRegion.longitudeDelta/2,},
                        {latitude: this.currRegion.latitude + this.currRegion.latitudeDelta/2,
                        longitude: this.currRegion.longitude - this.currRegion.longitudeDelta/2,},
                      ]
        }));
  }

  moveRegions(mapsObj){
    this.map.animateToRegion(mapsObj)
  }

  onRegionChange(region) {
    this.currRegion = region;
  }

  async refetchData(refetch){
    this.handleScreenConstraints();
    this.setState({ fetching: true});
    this.latestPosition = this.getCurrentPosition();
    refetch({ variables: this.latestPosition });
    this.skip = false;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          showsPointsOfInterest={false}
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

        <Query query={GET_NEARBY_RESTAURANTS} variables={this.latestPosition}>
          {({data, loading}) => {
            if (loading) return null;
            return (
              <View>
                {data.getBoxBasedRestaurants.map((marker, index) => {
                  const inputRange = [
                    (index - 1) * LayoutConstants.CARD_WIDTH,
                    index * LayoutConstants.CARD_WIDTH,
                    ((index + 1) * LayoutConstants.CARD_WIDTH),
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
                        scale
                      },
                    ],
                  };
                  return (
                    //<RestaurantMarker keyProp={index} location={marker.location} opacity={opacity} scaleStyle={scaleStyle}/>
                    <MapView.Marker key={index} onPress={() => this.restaurantScrollView.scrollTo(index * (LayoutConstants.CARD_WIDTH+20))} coordinate={marker.location}>
                      {this.state.index == index &&
                        <View style={{ backgroundColor: "blue", height: 5, width: 5, borderRadius: 12, borderColor: "black", borderWidth: 1 }} />
                      }
                      {this.state.index != index &&
                        <View style={{ backgroundColor: "red", height: 5, width: 5, borderRadius: 12, borderColor: "black", borderWidth: 1 }} />
                      }
                    </MapView.Marker>
                  );
                })}
              </View>
            )
          }}
        </Query>


        
        </MapView>

        <View>
          <Query query={GET_NEARBY_RESTAURANTS} variables={this.latestPosition} skip={this.skip}>
            {({ data, client, loading, refetch }) => {
              //write to local apollo store if data has changed
              const latestLocation = JSON.stringify(this.latestPosition);
              client.writeData({ data: { latestQuery: latestLocation }});
              
              if(loading) return null;
              return  <RestaurantScrollView markers={data.getBoxBasedRestaurants}
                                      onRef={(ref) => { this.restaurantScrollView = ref }}
                                      navigate={navigate}
                                      animateToRegion={this.moveRegions.bind(this)}
                                      handleIndexChange={this.handleIndexChange.bind(this)}
                                      animation={this.animation}/>
            }}
          </Query>

          <View style={styles.button}>
              <View>
                <TouchableNativeFeedback  onPress={async() => {
                  let location = await Location.getCurrentPositionAsync({});
                  this.setState(() => ({
                    userPos: {
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
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

              <Query  query={GET_NEARBY_RESTAURANTS} variables={this.latestPosition} >
                  {({refetch, loading})=>(
                    <RestaurantFetchButton handleRefetch={async () => this.refetchData(refetch)}
                    fetching={loading}/>
                  ) }
              </Query>

              
            
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
  icon: {
    padding: 7,
    color: "#FFF5EE"
  }
});
