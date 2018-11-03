import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


import Recommendation from "../../../components/Recommendation";

export default class RecommendationDetails extends React.Component {
    static navigationOptions = {
        title: "Details",
      };


    render(){
        const data = [{ user: "carlo_kne",
              fullName: "Carlo Kneißl",
              date: "yesterday",
              location: "Munich, Germany",
              restaurant: "Wirtshaus Peters",
              text: "Ein brilliantes Wirtshaus in uriger Umgebung. Die Bedienung war freundlich und das Essen lecker!",
              details: "These are the details of this2",
              img: "https://randomuser.me/api/portraits/men/0.jpg"
              },
              { user: "jsnow2",
              fullName: "John Snow",
              date: "02.03.2008",
              location: "Berlin, Germany",
              restaurant: "Fernsehturm",
              text: "Ein interessantes Essen mit allerlei Spektakel. Es hat alles gut geschmeckt und der Service war gutgelaunt!",
              details: "These are the details of this"
              },
              { user: "carlo_kne",
              fullName: "Carlo Kneißl",
              date: "yesterday",
              location: "Munich, Germany",
              restaurant: "Wirtshaus Peters",
              text: "Ein brilliantes Wirtshaus in uriger Umgebung. Die Bedienung war freundlich und das Essen lecker!",
              details: "These are the details of this"
              },
              { user: "carlo_kne",
              fullName: "Carlo Kneißl",
              date: "yesterday",
              location: "Munich, Germany",
              restaurant: "Wirtshaus Peters",
              text: "Ein brilliantes Wirtshaus in uriger Umgebung. Die Bedienung war freundlich und das Essen lecker!",
              details: "These are the details of this"
              },
            ];
        const { navigation } = this.props;
        const name = navigation.getParam("name", "ERROR");
        const adress = navigation.getParam("adress", "ERROR");
        const zip = navigation.getParam("zip", "ERROR");
        const city = navigation.getParam("city", "ERROR");
        const recommendations = navigation.getParam("recommendations", "ERROR");

        const _id = navigation.getParam("_id", "ERROR");
        const location = navigation.getParam("location", "ERROR");
        const { longitude, latitude } = location;
        //const otherParam = navigation.getParam('otherParam', 'some default value');

        const navigate = this.props.navigation.navigate;
        return (
            <View style={styles.Component}> 
                <Text style={styles.Title}>{name}</Text>
                <View style={styles.Details}>
                    <Text>{adress} {zip} {city}</Text>
                </View>
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={() => navigate("CreateRecommendation", {name, _id, latitude, longitude})}>
                        <MaterialIcons name="add" size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}> 
                <FlatList
                    data={recommendations}
                    renderItem={(rec) => <Recommendation rec={{user: rec.item.author.username, fullName: rec.item.author.fullName, date: rec.item.date, text: rec.item.body, img: rec.item.author.avatar, rating: rec.item.rating}} navigation={this.props.navigation}/>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 7, backgroundColor: "#f1fffb"}}></View>}
                />
                </View>         
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
        display: "flex",
    },
    addButtonContainer: {
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    Text : {
        color: "blue",
        fontSize: 20,
    },
    Title: {
        fontSize: 33,
        fontWeight: "bold"
    },
    Details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

})