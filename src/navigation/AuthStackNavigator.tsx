import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/auth/LoginScreen';
import SignUpScreen from '../screen/auth/SignUpScreen';

export type StackParamType = {
  // undefined = doesn't have parameters
  LoginScreen: undefined;
  SignUpScreen: undefined;
};
const Stack = createStackNavigator<StackParamType>();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen" headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
