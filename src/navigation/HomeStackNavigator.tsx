import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';

export type HomeStackParamType = {
  // undefined = doesn't have parameters
  HomeScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamType>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
