import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  counter: {
    ...StyleSheet.absoluteFill,
    fontSize: 128,
    width: Dimensions.get('window').width,
    textAlign: 'center',
  },
});

const Counter = ({ toValue, duration, isSpring }) => {
  return (
    <>
      <TextInput
        style={styles.counter}
        defaultValue="0"
        editable={false}
        underlineColorAndroid="transparent"
      />
    </>
  );
};

export default Counter;
