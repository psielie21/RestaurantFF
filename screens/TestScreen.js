import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
  ]

  const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

export default class TestScreen extends React.Component {
    static navigationOptions = {
        title: 'Test',
      };
    componentWillMount(){
        this.anim = new Animated.Value(0.01);
    }

    componentDidMount(){
        this.anim.addListener(({ value }) =>{
            console.log(value)
        })
    }
    state = {
        markers: [
          {
            coordinate: {
              latitude: 45.524548,
              longitude: -122.6749817,
            },
            title: "Perc Place",
            description: "Never had sushi that compared to  this!!",
            username: "@tom_k",
            fullName: "Tom Peter",
            rating: 4,
            image: Images[0],
          },
          {
            coordinate: {
              latitude: 45.524698,
              longitude: -122.6655507,
            },
            title: "Perc Place",
            description: "The sushi were awful!",
            username: "@tom_k",
            fullName: "Justus Jonas",
            rating: 4,
            image: Images[0],
          },
          {
            coordinate: {
              latitude: 45.5230786,
              longitude: -122.6701034,
            },
            title: "Third Best Place",
            description: "This is the third best place in Portland",
            image: Images[2],
          },
          {
            coordinate: {
              latitude: 45.521016,
              longitude: -122.6561917,
            },
            title: "Fourth Best Place",
            description: "This is the fourth best place in Portland",
            image: Images[3],
          },
        ],
        region: {
          latitude: 45.52220671242907,
          longitude: -122.6653281029795,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        },
      };

    render(){
        return (
            <View style={styles.Component}>
              <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                pagingEnabled={true}
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
              >
                <View style={styles.card}>
                <Text>{this.state.markers[0].title}</Text>
                  <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[0].description}
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
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[1].fullName}        1/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[1].description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                <Text>{this.state.markers[0].title}</Text>
                  <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[0].description}
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
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[1].fullName}        1/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[1].description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                <Text>{this.state.markers[0].title}</Text>
                  <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[0].description}
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
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[1].fullName}        1/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[1].description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                <Text>{this.state.markers[0].title}</Text>
                  <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[0].description}
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
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[1].fullName}        1/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[1].description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                <Text>{this.state.markers[0].title}</Text>
                  <View style={styles.rec}>
                  <Image
                        source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[0].fullName}        4/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[0].description}
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
                      <Text numberOfLines={1} style={styles.cardtitle}>{this.state.markers[1].fullName}        1/5</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {this.state.markers[1].description}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>


              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Component:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
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
        //overflow: "hidden",
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
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
})