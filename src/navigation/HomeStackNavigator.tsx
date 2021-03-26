import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import HomeScreen from '../screen/chatApp/HomeScreen';
import AddRoomScreen from '../screen/modal/AddRoomScreen';
import Colors from '../constants/Colors';
import RoomScreen from '../screen/chatApp/RoomScreen';
import { ThreadType } from '../screen/chatApp/HomeScreen';

type HomeScreenPropType = {
  navigation: StackNavigationProp<ModalStackParamType, 'AddRoomScreen'>;
};

export type ChatAppStackParamType = {
  // undefined = doesn't have parameters
  HomeScreen: undefined | { navigation: HomeScreenPropType };
  RoomScreen: undefined | { thread: ThreadType };
};

const ChatAppStack = createStackNavigator<ChatAppStackParamType>();

const ChatAppStackNavigator: React.FC = () => {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    >
      <ChatAppStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Meet Chat',
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
      <ChatAppStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={({ route }) => ({
          title: route.params?.thread.name
        })}
      />
    </ChatAppStack.Navigator>
  );
};

export type ModalStackParamType = {
  // undefined = doesn't have parameters
  ChatApp: undefined;
  AddRoomScreen: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamType>();

const HomeStackNavigator: React.FC = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatAppStackNavigator} />
      <ModalStack.Screen name="AddRoomScreen" component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
};

export default HomeStackNavigator;
