import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Counter from './Counter';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Counter toValue={100} duration={2000} />
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
