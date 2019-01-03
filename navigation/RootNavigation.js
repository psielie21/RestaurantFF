import React from 'react';
import { connect } from "react-redux";
import { createSwitchNavigator, createAppContainer  } from "react-navigation";

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from "./AuthNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: AuthNavigator,
},
{
  initialRouteName: "AuthLoading"
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
