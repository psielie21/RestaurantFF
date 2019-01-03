import React, { Component } from "react";
import {
    StyleSheet,
    View,
} from "react-native";

import { MapView} from 'expo';
import LayoutConstants from "../../constants/Layout";

export default class MapMarkerList extends Component {
    render(){
        return(
            <View>
                {this.props.markers.map((marker, index) => {
                        /*
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
                        */
                        return (
                            //<RestaurantMarker keyProp={index} location={marker.location} opacity={opacity} scaleStyle={scaleStyle}/>
                            //implement later: onPress={(index) => this.restaurantScrollView.scrollTo(index * (LayoutConstants.CARD_WIDTH+20))}
                            <MapView.Marker key={index} coordinate={marker.location}>
                            {this.props.index == index &&
                                <View style={{ backgroundColor: "blue", height: 5, width: 5, borderRadius: 12, borderColor: "black", borderWidth: 1 }} />
                            }
                            {this.props.index != index &&
                                <View style={{ backgroundColor: "red", height: 5, width: 5, borderRadius: 12, borderColor: "black", borderWidth: 1 }} />
                            }
                            </MapView.Marker>
                        );
                    })}
            </View>
        )
    }
        
}