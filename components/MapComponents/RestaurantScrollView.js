import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
} from "react-native";

import { ApolloConsumer } from 'react-apollo';

import Card from "../ThumbnailCard";

import LayoutConstants from "../../constants/Layout"
import MapConstants from "../../constants/Map"

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
      let index = Math.ceil(value / (LayoutConstants.CARD_WIDTH + 20));
      if (index >= this.props.markers.length) {
        index = this.props.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      if(this.props.markers.length != 0){
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { location } = this.props.markers[index];
            this.props.animateToRegion(
              {
                ...location,
                latitudeDelta: MapConstants.REGION_ZOOM_DELTAS.latitudeDelta,
                longitudeDelta: MapConstants.REGION_ZOOM_DELTAS.longitudeDelta,
              }
            );
          }
          const safeIndex = (value / (LayoutConstants.CARD_WIDTH+20))
          if(Number.isInteger(safeIndex)){
            //this.props.handleIndexChange(safeIndex);
          }
        }, 10);
      }
    });
  }

  scrollTo(value){
    this.scrollView.getNode().scrollTo({x: value, animated: true})
  }

  render(){
    return(
      <ApolloConsumer>
        {client => (
          <Animated.ScrollView
              ref={ref => this.scrollView = ref}
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={true}
              snapToInterval={LayoutConstants.CARD_WIDTH+20}
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
                <Card marker={marker} key={index} count={marker.recommendations.length} callback={() => {
                  client.writeData({ data: { activeRestaurant: marker._id }});
                  this.props.navigate("Details", {marker});
                }}/>
              ))
              }
            </Animated.ScrollView>
          )}
        </ApolloConsumer>
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
    paddingRight: LayoutConstants.window.width - LayoutConstants.CARD_WIDTH - 20,
  },
})
