import { createStackNavigator } from 'react-navigation';

import LoginScreen from "../screens/AuthStack/LoginScreen";
import RegisterScreen from "../screens/AuthStack/RegisterScreen"


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
    },
    {
      navigationOptions: () => ({
        headerMode: "none"
      })
    }
  )

export default AuthStack 