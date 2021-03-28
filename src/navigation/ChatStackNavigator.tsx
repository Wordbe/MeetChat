import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import ChatsScreen from '../screen/chat/ChatsScreen';
import AddRoomScreen from '../screen/chat/modal/AddRoomScreen';
import Colors from '../constants/Colors';
import RoomScreen from '../screen/chat/RoomScreen';
import { ThreadType } from '../screen/chat/ChatsScreen';
import { AuthContext } from './AuthProvider';

type ChatsScreenPropType = {
  navigation: StackNavigationProp<ModalStackParamType, 'AddRoomScreen'>;
};

export type ChatAppStackParamType = {
  // undefined = doesn't have parameters
  ChatsScreen: undefined | { navigation: ChatsScreenPropType };
  RoomScreen: undefined | { thread: ThreadType };
};

const ChatAppStack = createStackNavigator<ChatAppStackParamType>();

const ChatAppStackNavigator: React.FC = () => {
  const { logout } = useContext(AuthContext);

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
        name="ChatsScreen"
        component={ChatsScreen}
        options={({ navigation }) => ({
          title: 'Meet Chat',
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={22}
              color={Colors.accent}
              onPress={() => navigation.navigate('AddRoomScreen')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout-variant"
              size={26}
              color={Colors.accent}
              onPress={() => logout?.()}
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
