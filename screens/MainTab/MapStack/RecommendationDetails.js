import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import Recommendation from "../../../components/Recommendation";

import AddButton from "../../../components/RecommendationDetailsComponents/RecommendationAddButton";


export default class RecommendationDetails extends React.Component {
    static navigationOptions = {
        title: "Details",
      };


    render(){
        const { navigation } = this.props;
        const { navigate } = navigation;
        const name = navigation.getParam("name", "ERROR");
        const adress = navigation.getParam("adress", "ERROR");
        const zip = navigation.getParam("zip", "ERROR");
        const city = navigation.getParam("city", "ERROR");
        const recommendations = navigation.getParam("recommendations", "ERROR");
        //const otherParam = navigation.getParam('otherParam', 'some default value');


        return (
            <View style={styles.component}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.details}>
                  <Text>{adress} {zip} {city}</Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                    data={recommendations}
                    renderItem={(rec) => <Recommendation rec={{user: rec.item.author.username, fullName: rec.item.author.fullName, date: rec.item.date, text: rec.item.body, img: rec.item.author.avatar, rating: rec.item.rating}} navigation={this.props.navigation}/>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 7, backgroundColor: "#f1fffb"}}></View>}
                />
              </View>
                <AddButton onPress={() => navigate("CreateRecommendationInput", { name })} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        flex:1,
        display: "flex",
        },
    text : {
        color: "blue",
        fontSize: 20,
    },
    title: {
        fontSize: 33,
        fontWeight: "bold"
    },
    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
});
