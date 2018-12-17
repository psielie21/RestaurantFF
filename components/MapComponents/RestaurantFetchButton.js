import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableNativeFeedback,
    ActivityIndicator,
} from "react-native";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Entypo } from "@expo/vector-icons";


export default class RestaurantFetchButton extends Component {
  render(){
    return (
      <View>
        <TouchableNativeFeedback onPress={async() => this.props.handleRefetch()}>
          <Entypo name={"magnifying-glass"} size={35} style={{
            padding: 7,
            color: "#FFF5EE"
            }}/>
        </TouchableNativeFeedback>
        {this.props.fetching &&
          <ActivityIndicator  size="large" color="#00ff00" />
        }
      </View>
    )
  }
}
