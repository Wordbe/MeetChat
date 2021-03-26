import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screen/HomeScreen';
import AddRoomScreen from '../screen/room/AddRoomScreen';
import Colors from '../constants/Colors';

export type ChatAppStackParamType = {
  // undefined = doesn't have parameters
  HomeScreen: undefined;
};

export type RoomStackParamType = {
  // undefined = doesn't have parameters
  ChatApp: undefined;
  AddRoomScreen: undefined;
};

const ChatAppStack = createStackNavigator<ChatAppStackParamType>();
const ModalStack = createStackNavigator<RoomStackParamType>();

const ChatAppStackNavigator: React.FC = () => {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary
        },
        headerTintColor: '#fff',
        headerTitle: 'Meet Chat 목록',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    >
      <ChatAppStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }: any) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={22}
              color={Colors.accent}
              onPress={() => navigation.navigate('AddRoomScreen')}
            />
          )
        })}
      />
    </ChatAppStack.Navigator>
  );
};

const HomeStackNavigator: React.FC = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatAppStackNavigator} />
      <ModalStack.Screen name="AddRoomScreen" component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
};

export default HomeStackNavigator;
