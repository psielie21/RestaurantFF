import React from 'react';
import { connect } from "react-redux";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from "./AuthNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: MainTabNavigator,
  Auth: AuthNavigator,
},
{
  initialRouteName: "AuthLoading"
})
