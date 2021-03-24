import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../../component/form/FormInput';
import FormButton from '../../component/form/FormButton';
import Colors from '../../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamType } from '../../navigation/AuthStackNavigator';

type LoginScreepPropType = {
  navigation: StackNavigationProp<StackParamType, 'LoginScreen'>;
};

const LoginScreen: React.FC<LoginScreepPropType> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>MeetYou Chat</Title>
      <FormInput
        labelName="이메일"
        value={email}
        autoCapitalize="none"
        onChangeText={(userEmail: string) => setEmail(userEmail)}
      />
      <FormInput
        labelName="비밀번호"
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword: string) => setPassword(userPassword)}
      />
      <FormButton
        title="로그인"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
      />
      <FormButton
        title="회원가입"
        modeValue="text"
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => props.navigation.navigate('SignUpScreen')}
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
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
});

export default LoginScreen;
