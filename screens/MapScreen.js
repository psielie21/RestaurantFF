import React from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";

import { MapView } from 'expo';

import { Entypo } from "@expo/vector-icons";

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

export default class LinksScreen extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      op: 1,
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Perc Place",
          receptions: [
              {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            },
            {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            }
          ],
          image: Images[0],
        },
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Perc Place",
          receptions: [
              {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            },
            {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            }
          ],
          image: Images[0],
        },
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Perc Place",
          receptions: [
              {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            },
            {
              description: "Never had sushi that compared to  this!!",
              username: "@tom_k",
              fullName: "Tom Peter",
              rating: 4,
            }
          ],
          image: Images[0],
        },
      ],
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };

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
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    setTimeout(() => {
      this.setState({op: 0})
    }, 5000)
  }

  _searchNearby(){
    Alert.alert("haha")
  }

  

  
  render() {

    console.log("HELLO");
    return (
      <View style={styles.container}>
  
     
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
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
            const opacityStyle = {
              opacity: opacity,
            };
            return (
              <MapView.Marker.Animated key={index} coordinate={marker.coordinate} style={{opacity, backgroundColor: "transparent", height: 100, width: 100, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                <Animated.View style={[{backgroundColor: "rgba(26,33,110, 0.7)", 
                                borderWidth: 1.5,
                                borderColor: "rgba(26,33,110, 0.9)",
                                height: 20, 
                                width: 20,
                                borderRadius: 12,                             
                            }, scaleStyle]}/>
              </MapView.Marker.Animated>
            );
          })}
        </MapView>
        <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
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
            {this.state.markers.map((marker, index) => {

              return(
                <TouchableNativeFeedback onPress={this._searchNearby}>
                <View style={styles.card}>
              <Text>{marker.title}</Text>
                <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.receptions[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {marker.receptions[0].description}
                      </Text>
                    </View>
                </View>
                <View style={styles.rec}>
                <Image
                      source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                      style={styles.cardImage}
                      resizeMode="cover"
                />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.receptions[1].fullName}        1/5</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.receptions[1].description}
                    </Text>
                  </View>
                </View>
              </View>
              </TouchableNativeFeedback>
              )
            })
              
            }
          </Animated.ScrollView>

          <Animated.View style={{backgroundColor: "rgba(130,195,150, 0.9)",
                                 position: "absolute",
                                 top: height/2,
                                 height: 20, 
                                width: 20,
                                borderRadius: 12,     
                                transform: [
                                  {scale: this.animation.interpolate({inputRange: [0.01, 410], 
                                                                      outputRange: [1,5]})}
                                ]
          }}>
          </Animated.View>

          <View style={styles.button}>
            <TouchableNativeFeedback  onPress={this._searchNearby}>
              <Entypo name={"compass"} size={35} style={styles.icon}/>     
            </TouchableNativeFeedback>
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
    paddingRight: width - CARD_WIDTH,
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
    marginTop: 10
  },
  cardImage: {
    flex: 1,
    width: 30,
    height: 30,
    alignSelf: "center",
    resizeMode: "cover"
  },
  textContent: {
    marginLeft: 5,
    flex: 4,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
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