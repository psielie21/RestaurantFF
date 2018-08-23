import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from '../screens/TestScreen';
import SecondStep from "../screens/SecondStep";
import RecommendationDetails from "../screens/RecommendationDetails"

const SettingsStack = createStackNavigator({
  Home: SettingsScreen,
  Details: RecommendationDetails
  },
  {
    navigationOptions: () => ({
      headerMode: "none"
    }),
  }
);

const AddStack = createStackNavigator({
  Home: TestScreen,
  SecondStep: SecondStep
  },
  {
    navigationOptions: () => ({
      headerMode: "none"
    })
  }
);

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Map: {
      screen: MapScreen,
    },
    Settings: {
      screen: SettingsStack,
    },
    Test: {
      screen: AddStack
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Map':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
              break;
          case "Test":
            iconName = "md-hammer";
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
