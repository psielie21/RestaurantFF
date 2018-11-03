import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

export default class ThumbnailCard extends React.Component {
    render(){
      const count = this.props.count;
      if(count > 1){
        return(
          <TouchableNativeFeedback onPress={this.props.callback}>
            <View style={styles.card}>
              <Text>{this.props.marker.name}</Text>
              <View style={styles.rec}>
                <Image
                  source={{uri: this.props.marker.recommendations[0].author.avatar}}
                  style={styles.cardImage}
                  resizeMode="cover"
                 />
                <View style={styles.textContent}>
                  <View style={styles.nameContainer}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{this.props.marker.recommendations[0].author.fullName}</Text>
                  <Text numberOfLines={1} style={styles.rating}>{this.props.marker.recommendations[0].rating}/5</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {this.props.marker.recommendations[0].body}
                  </Text>
                </View>
              </View>
              <View style={styles.rec}>
                <Image
                  source={{uri: this.props.marker.recommendations[1].author.avatar}}
                  style={styles.cardImage}
                  resizeMode="cover"
                 />
                <View style={styles.textContent}>
                  <View style={styles.nameContainer}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{this.props.marker.recommendations[1].author.fullName}</Text>
                  <Text numberOfLines={1} style={styles.rating}>{this.props.marker.recommendations[1].rating}/5</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {this.props.marker.recommendations[1].body}
                  </Text>
                </View>
              </View>
          </View>
        </TouchableNativeFeedback>
          )
      }else if( count == 1){
        return(
          <TouchableNativeFeedback onPress={this.props.callback}>
            <View style={styles.card}>
              <Text>{this.props.marker.name}</Text>
              <View style={styles.rec}>
                <Image
                  source={{uri: this.props.marker.recommendations[0].author.avatar}}
                  style={styles.cardImage}
                  resizeMode="cover"
                 />
                <View style={styles.textContent}>
                  <View style={styles.nameContainer}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{this.props.marker.recommendations[0].author.fullName}</Text>
                  <Text numberOfLines={1} style={styles.rating}>{this.props.marker.recommendations[0].rating}/5</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {this.props.marker.recommendations[0].body}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
        )
      }else {
        return(
          <TouchableNativeFeedback onPress={this.props.callback}>
            <View style={styles.card}>
              <Text>{this.props.marker.name}</Text>
              <View style={styles.rec}>

                <View style={styles.textContent}>

                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
        )
        
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    },
    textContent: {
      marginLeft: 5,
      marginBottom: 4,
      flex: 4,
    },
    cardtitle: {
      fontSize: 12,
      fontWeight: "bold",
      flex: 4
    },
    cardDescription: {
      fontSize: 12,
      color: "#444",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "row",
    },
    rating: {
      flex: 1,
      fontSize: 12,
      fontWeight: "bold",
    }
  });