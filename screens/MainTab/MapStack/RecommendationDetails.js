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
        const marker = navigation.getParam("marker", "ERROR");
        //const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={styles.component}>
              <Text style={styles.title}>{marker.name}</Text>
              <View style={styles.details}>
                  <Text>{marker.adress} {marker.zip} {marker.city}</Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                    data={marker.recommendations}
                    renderItem={(rec) => <Recommendation rec={rec.item} navigation={this.props.navigation}/>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 7, backgroundColor: "#f1fffb"}}></View>}
                />
              </View>
                <AddButton onPress={() => navigate("CreateRecommendationInput")} />
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
