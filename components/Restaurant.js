import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from "react-native";



const { width, height } = Dimensions.get("window");

export default class Restaurant extends Component {
    render() {
        
        let rest = this.props.rest;
        
        
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.name}>{rest.name}</Text>
                    <View style={styles.info}>
                        <Text style={styles.text}>{rest.adress}</Text>
                        <Text style={styles.text}>{rest.city}</Text>
                        <Text style={styles.text}>{rest.zip}</Text>
                    </View>
                    
                </View>
            </View>
        )
    }

}


  
const styles = StyleSheet.create({
    root : {
        backgroundColor: "white",
        flex: 1
    },
    container: {
        padding: 15,
        display: "flex",
        width: width
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    text: {
        fontSize: 17
    }
})