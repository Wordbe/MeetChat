import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../../component/form/FormInput';
import FormButton from '../../component/form/FormButton';
import Colors from '../../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamType } from '../../navigation/AuthStackNavigator';

import { AuthContext } from '../../navigation/AuthProvider';

type LoginScreepPropType = {
  navigation: StackNavigationProp<AuthStackParamType, 'LoginScreen'>;
};

const LoginScreen: React.FC<LoginScreepPropType> = props => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Meet Chat</Title>
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
        onPress={() => login?.(email, password)}
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
