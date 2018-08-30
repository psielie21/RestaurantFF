import React from 'react';
import { View,
        FlatList,
        Button } from "react-native";
import { createStackNavigator } from "react-navigation";

import Recommendation from "../components/Recommendation";
import RecommendationDetails from './RecommendationDetails';

export default class NewsScreen extends React.Component {
  static navigationOptions = {
    title: 'News',
  };

  

  render() {
    const data = [{ user: "carlo_kne",
              fullName: "Carlo Kneißl",
              date: "yesterday",
              location: "Munich, Germany",
              restaurant: "Wirtshaus Peters",
              text: "Ein brilliantes Wirtshaus in uriger Umgebung. Die Bedienung war freundlich und das Essen lecker!",
              details: "These are the details of this2",
              img: "https://randomuser.me/api/portraits/men/0.jpg"
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
              { user: "carlo_kne",
              fullName: "Carlo Kneißl",
              date: "yesterday",
              location: "Munich, Germany",
              restaurant: "Wirtshaus Peters",
              text: "Ein brilliantes Wirtshaus in uriger Umgebung. Die Bedienung war freundlich und das Essen lecker!",
              details: "These are the details of this"
              },
            ];
    return (
      <View>
        <FlatList 
          data={data}
          renderItem={(rec) => <Recommendation rec={rec.item} navigation={this.props.navigation}/>}
          ItemSeparatorComponent={() => <View style={{height: 7, backgroundColor: "#473c46"}}></View>}
        />
      </View>
    );
  }

}

