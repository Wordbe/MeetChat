import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../component/form/FormButton';
import Colors from '../constants/Colors';

import { AuthContext } from '../navigation/AuthProvider';

const HomeScreen: React.FC = () => {
  const { aUser, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
      <Title>모든 채팅방 목록이 보입니다.</Title>
      <Title>{aUser.uid}</Title>
      <FormButton
        modeValue="contained"
        title="로그아웃"
        onPress={() => logout()}
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
