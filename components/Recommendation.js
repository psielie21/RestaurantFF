import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from "react-native";
import ViewMoreText from 'react-native-view-more-text';

import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';

import getUserFriendlyDate from "../util/getUserFriendlyDate";

export default class Recommendation extends Component {
    renderViewMore(onPress){
        return(
          <Text onPress={onPress}>View more</Text>
        )
      }

      renderViewLess(onPress){
        return(
          <Text onPress={onPress}>View less</Text>
        )
      }

    renderStars(rec){
        let elem = [];
        for(let i = 1; i <= rec.rating; i++){
            elem.push(<MaterialIcons key={i} name={"star"} size={30}/>)
        }

        for(let i = rec.rating+1; i <= 5; i++){
            elem.push(<MaterialIcons key={i} name={"star-border"} size={30}/>)
        }

        return elem;
    }  

    render() {
        let rec = this.props.rec;
        console.log(rec);
        const { navigate } = this.props.navigation;

        this.state = {
            nol: 3,
            expanded: false
        }

        const _save = () => {

        }

        const avatarPic = rec.author.avatar ?
                         {uri: rec.author.avatar} : require('../assets/images/default-avatar.png');
        
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={avatarPic} style={{width:50, height: 50}}/>
                        <View style={styles.metacontainer}>
                            <View style={styles.metatopcontainer}>
                                <Text style={styles.fullName}>{rec.author.firstName + " " + rec.author.lastName}</Text>
                                <Text style={styles.person}>@{rec.author.username}</Text>
                            </View>
                            <View style={styles.metabottomcontainer}>
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    <FontAwesome name="calendar" style={styles.icon}/>
                                    <Text style={styles.date}>{getUserFriendlyDate(rec.createdAt)}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row"}}>
                                    {rec.location  && 
                                        <Entypo name="location-pin" size={15} style={styles.iconNoPad}/>
                                    }
                                    {rec.location &&
                                        <Text style={styles.location}>{rec.location}</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <Text style={styles.restaurant}>{rec.restaurant}</Text>
                        <ViewMoreText
                            numberOfLines={3}
                            renderViewMore={this.renderViewMore}
                            renderViewLess={this.renderViewLess}
                        >
                            <Text style={styles.text}>"{rec.body}"</Text>
                        </ViewMoreText>

                        <View style={styles.rating}>
                            {
                                this.renderStars(rec)
                            }
                        </View>
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
    textContainer: {
        //maxHeight: 30
        paddingRight: 20,
        paddingLeft: 20,
    },
    text : {
        
        fontSize: 15,
        fontStyle: "italic"
    },
    rating : {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 40,
        paddingRight: 40,
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