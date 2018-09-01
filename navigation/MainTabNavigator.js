import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NewsScreen from '../screens/NewsScreen';
import CreateScreen from '../screens/CreateScreen';
import SecondStep from "../screens/SecondStep";
import RecommendationDetails from "../screens/RecommendationDetails";
import AddRestaurantScreen from "../screens/AddRestaurantScreen";

const MapStack = createStackNavigator({
  Home: MapScreen,
  Details: RecommendationDetails
  },
  {
    navigationOptions: () => ({
      headerMode: "none"
    })
  }
)


const AddStack = createStackNavigator({
  Home: CreateScreen,
  SecondStep: SecondStep,
  AddRest: AddRestaurantScreen,
  },
  {
    navigationOptions: () => ({
      headerMode: "none"
    })
  }
);

export default createBottomTabNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
    Map: {
      screen: MapStack,
    },
    News: {
      screen: NewsScreen,
    },
    Create: {
      screen: AddStack
    },
    
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Main':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Map':
            iconName = Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map';
            break;
          case 'News':
            iconName =
              Platform.OS === 'ios' ? `ios-globe${focused ? '' : '-outline'}` : 'md-globe';
              break;
          case "Create":
            iconName = 
              Platform.OS === 'ios' ? `ios-create${focused ? '' : '-outline'}` : 'md-create';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
