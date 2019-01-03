import React, { Component } from "react";
import {View, TouchableNativeFeedback } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Location } from 'expo';

import MapConstants from "../../../constants/Map";


export default class CurrentLocationButton extends Component {
    render(){
        return (
            <TouchableNativeFeedback  onPress={async() => {
                let location = await Location.getCurrentPositionAsync({});
                this.props.centerMap(
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
            }}>
                <Entypo name={"compass"} size={35} style={{padding: 7, color: "#FFF5EE"}}/>
              </TouchableNativeFeedback>
        )
    }
}