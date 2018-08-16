import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button
} from "react-native";

import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

export default class Recommendation extends Component {
    render() {
        let rec = this.props.rec;
        const { navigate } = this.props.navigation;

        const _save = () => {

        }
        
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={{uri: "https://randomuser.me/api/portraits/men/0.jpg"}} style={{width:50, height: 50}}/>
                        <View style={styles.metacontainer}>
                            <View style={styles.metatopcontainer}>
                                <Text style={styles.fullName}>{rec.fullName}</Text>
                                <Text style={styles.person}>@{rec.user}</Text>
                            </View>
                            <View style={styles.metabottomcontainer}>
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    <FontAwesome name="calendar" style={styles.icon}/>
                                    <Text style={styles.date}>{rec.date}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    <Entypo name="location-pin" size={15} style={styles.iconNoPad}/>
                                    <Text style={styles.location}>{rec.location}</Text>
                                </View>
                               
                            </View>
                        </View>
                        
                        
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.restaurant}>{rec.restaurant}</Text>
                        <Text style={styles.text}>"{rec.text}"</Text>
                        <View style={styles.rating}>

                        </View>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button style={styles.button} title="Details" onPress={() => {
                            navigate('Details', {details:  rec.details })
                            }}
                         />
                        <Button style={styles.button} title="Save" onPress = {() => _save()}
                        
                        />
                    </View>
                </View>
            </View>
        )
    }

}


  
const styles = StyleSheet.create({
    root : {
        backgroundColor: "white"
    },
    container: {
        padding: 15,
    },
    header : {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "lightgrey"
    },
    person: {
        fontSize: 16,
        color: "#3c3c3c"
    },
    metacontainer: {
        display: "flex",
        flex: 1,
        justifyContent : "space-between"
    },
    metatopcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 5,
        marginRight: 5
    },
    fullName: {
        fontSize: 17,
        fontWeight: "700"
    },
    metabottomcontainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    date: {

    },
    icon: {
        marginRight: 7,
        paddingTop: 5
    },
    iconNoPad: {
        marginRight: 4,
        paddingTop: 2
    },
    location : {

    },
    body : {

    },
    restaurant: {
        fontSize: 24,
        paddingTop: 3,
        textAlign: "center"
    },
    text : {
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 15,
        fontStyle: "italic"
    },
    rating : {

    },
    buttoncontainer : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 5
    },
    button : {

    },
    buttontext : {
        fontSize: 18
    }
})