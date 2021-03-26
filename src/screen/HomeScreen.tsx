import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../component/form/FormButton';
import Colors from '../constants/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoomStackParamType } from '../navigation/HomeStackNavigator';
import Icon from 'react-native-vector-icons/Entypo';

type HomeScreenPropType = {
  navigation: StackNavigationProp<RoomStackParamType, 'ChatApp'>;
};

const HomeScreen: React.FC<HomeScreenPropType> = props => {
  const { aUser, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Icon name="chat" size={40} color={Colors.third} />
      <Title>모든 채팅방 목록이 보입니다.</Title>
      <Title>{aUser.uid}</Title>
      <FormButton
        modeValue="contained"
        title="로그아웃"
        onPress={() => logout()}
      />
      <FormButton
        modeValue="contained"
        title="방 만들기"
        onPress={() => props.navigation.navigate('AddRoomScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
