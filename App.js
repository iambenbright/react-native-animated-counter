import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Counter from './Counter';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Counter toValue={50} duration={3000} isSpring={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
