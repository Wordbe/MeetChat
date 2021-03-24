import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../constants/Colors';

interface FormInputType {
  labelName: string;
  [rest: string]: any;
}

const { width, height } = Dimensions.get('screen');

const FormInput: React.FC<FormInputType> = props => {
  return (
    <TextInput
      style={styles.input}
      label={props.labelName}
      numberOfLines={1}
      mode={'outlined'}
      {...props.rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    width: width / 1.5,
    height: height / 15,
    backgroundColor: 'white'
  }
});

export default FormInput;