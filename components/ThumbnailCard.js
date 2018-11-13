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
      const recommendationPreview = this.props.marker.recommendations.length > 2 ?
                            this.props.marker.recommendations.slice(0,2) : this.props.marker.recommendations;
      if(this.props.marker.recommendations.length != 0){
        console.log(recommendationPreview);
      }
      return (
        <TouchableNativeFeedback onPress={this.props.callback}>
            <View style={styles.card}>
              <Text>{this.props.marker.name}</Text>
                {recommendationPreview.map(recommendation => {
                  const avatarPic = recommendation.author.avatar ?
                         {uri: recommendation.author.avatar} : require('../assets/images/default-avatar.png');
                  return (
                    <View style={styles.rec}>
                      <Image
                        source={avatarPic}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      <View style={styles.textContent}>
                        <View style={styles.nameContainer}>
                          <Text numberOfLines={1} style={styles.cardtitle}>{recommendation.author.firstName + " " + recommendation.author.lastName}</Text>
                          <Text numberOfLines={1} style={styles.rating}>{recommendation.rating}/5</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.cardDescription}>
                          {recommendation.body}
                        </Text>
                      </View>
                    </View>
                  )})}
            </View>
          </TouchableNativeFeedback>
        )
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