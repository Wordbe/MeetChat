import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text } from 'react-native-paper';
import FormInput from '../../component/form/FormInput';
import FormButton from '../../component/form/FormButton';
import Colors from '../../constants/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamType } from '../../navigation/AuthStackNavigator';

import { AuthContext } from '../../navigation/AuthProvider';

type SingUpScreepPropType = {
  navigation: StackNavigationProp<AuthStackParamType, 'SignUpScreen'>;
};

const SignUpScreen: React.FC<SingUpScreepPropType> = props => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>회원가입</Title>
      <Text style={styles.text}>새로운 대화를 나누어 보세요.</Text>
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
        title="완료"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => register?.(email, password)}
      />
      <FormButton
        title="back"
        modeValue="text"
        labelStyle={styles.navButton}
        onPress={() => props.navigation.goBack()}
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
  text: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 18
  },
  navButton: {
    marginTop: 10
  }
});

export default SignUpScreen;
