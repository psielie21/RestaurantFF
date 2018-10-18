import React from "react";
import { MapView } from "expo";
import { Animated, View, StyleSheet } from "react-native";


const RestaurantMarker = ({ keyProp, location, opacity, scaleStyle, active }) => {

    if(active){
      return (
          <MapView.Marker.Animated key={keyProp} coordinate={location} style={{opacity, ...styles.markerContainer}}>
            <Animated.View style={[styles.markerRing, scaleStyle]}>
                  <View style={styles.activeMarkerCenter}/>
              </Animated.View >
          </MapView.Marker.Animated>
        );
    }else {
      return (
          <MapView.Marker.Animated key={keyProp} coordinate={location} style={{opacity, ...styles.markerContainer}}>
            <Animated.View style={[styles.markerRing, scaleStyle]}>
                  <View style={styles.markerCenter}/>
              </Animated.View >
          </MapView.Marker.Animated>
        );
    }

  }

const styles = StyleSheet.create({
    markerContainer: {
        backgroundColor: "transparent",
        height: 100,
        width: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    markerRing: {
        backgroundColor: "rgba(26,33,110, 0.7)",
        borderWidth: 1.5,
        borderColor: "rgba(26,33,110, 0.9)",
        height: 20,
        width: 20,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    markerCenter: {
        backgroundColor: "rgba(55,55,55, 0.7)",
        height: 2,
        width: 2,
        borderRadius: 12,
    },
    activeMarkerCenter: {
        backgroundColor: "rgba(155,155,155, 1)",
        height: 2,
        width: 2,
        borderRadius: 12,
    }
})
export default RestaurantMarker
