import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormInput from '../../component/form/FormInput';
import FormButton from '../../component/form/FormButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ModalStackParamType } from '../../navigation/HomeStackNavigator';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../constants/Colors';

type AddRoomScreenPropType = {
  navigation: StackNavigationProp<ModalStackParamType, 'ChatApp'>;
};

const AddRoomScreen: React.FC<AddRoomScreenPropType> = props => {
  const [roomName, setRoomName] = useState<string>('');

  const handleButtonPress = () => {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName
        })
        .then(() => {
          props.navigation.navigate('ChatApp');
        });
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color={Colors.third}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>새로운 방을 만드세요.</Title>
        <FormInput
          labelName="채팅방 이름"
          value={roomName}
          onChangeText={(text: string) => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="생성"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  }
});

export default AddRoomScreen;
