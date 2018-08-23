import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import Recommendation from "../components/Recommendation";

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
        const itemId = navigation.getParam('details', 'NO-ID');
        const restaurant = navigation.getParam('restaurant', 'ERROR');
        const location = navigation.getParam("location", "ERROR")
        //const otherParam = navigation.getParam('otherParam', 'some default value');


        return (
            <View style={styles.Component}> 
                <Text style={styles.Title}>{restaurant}</Text>
                <View style={styles.Details}>
                    <Text>{location}</Text>
                </View>
                <View>
                <FlatList
                    data={data}
                    renderItem={(rec) => <Recommendation rec={{user: rec.item.user, fullName: rec.item.fullName, date: rec.item.date, text: rec.item.text, img: rec.item.img}} navigation={this.props.navigation}/>
                    }
                    ItemSeparatorComponent={() => <View style={{height: 7, backgroundColor: "#f1fffb"}}></View>}/>
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