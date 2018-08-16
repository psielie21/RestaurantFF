import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class RecommendationDetails extends React.Component {
    


    render(){
        const { navigation } = this.props;
        const itemId = navigation.getParam('details', 'NO-ID');
        //const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={styles.Component}> 
                <Text style={styles.Text}>{itemId}</Text>

            </View>
        )
    }

    _handleTouch = () => {
        this.setState({count: this.state.count+1})
    }

    _getMoviesFromApiAsync = () => {
        return fetch('https://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({response: JSON.stringify(responseJson.movies)}) ;
          })
          .catch((error) => {
            console.error(error);
          });
      }
}

const styles = StyleSheet.create({
    Component:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    Text : {
        color: "blue",
        fontSize: 20,
    },
    ButtonText: {
        fontSize: 15,
        color: "black",
    },
    Button: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 40,
    },
})