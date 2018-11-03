import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
} from "react-native";

import Card from "../ThumbnailCard";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT + 50;

const REGION_DELTAS = {
  latitudeDelta: 0.01864195044303443,
  longitudeDelta: 0.010142817690068,
}

export default class RestaurantScrollView extends Component {
  //https://stackoverflow.com/questions/36716207/react-native-accessing-refs-in-a-custom-component
  componentDidMount(){
    //setup a ref on the parent component
    if(this.props.onRef != null){
      this.props.onRef(this);
    }

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.props.animation.addListener(({ value }) => {
      //console.log(value);
      let index = Math.floor(value / (CARD_WIDTH + 20)); // animate 30% away from landing on the next item
      if (index >= this.props.markers.length) {
        index = this.props.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { location } = this.props.markers[index];
          this.props.animateToRegion(
            {
              ...location,
              latitudeDelta: REGION_DELTAS.latitudeDelta,
              longitudeDelta: REGION_DELTAS.longitudeDelta,
            }
          );
        }
        const safeIndex = (value / (CARD_WIDTH+20))
        if(Number.isInteger(safeIndex)){
          this.props.handleIndexChange(safeIndex);
        }
      }, 10);
    });
  }

  scrollTo(value){
    this.scrollView.getNode().scrollTo({x: value, animated: true})
  }

  render(){
    return(
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
                    x: this.props.animation
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.props.markers.map((marker, index) => (
            <Card marker={marker} key={marker._id} count={marker.recommendations.length} callback={() => this.props.navigate("Details", marker)}/>
          ))
          }
        </Animated.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
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
})
