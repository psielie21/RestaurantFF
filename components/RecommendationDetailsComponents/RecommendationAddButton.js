import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default class RecommendationAddButton extends Component {
    render(){
      const name = navigation.getParam("name", "ERROR");
      return (
        <View>
          <TouchableOpacity onPress={() => this.props.navigate("CreateRecommendationInput", { name })}>
            <MaterialIcons name={"add"} size={35} />
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({

})
