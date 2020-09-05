import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  counter: {
    ...StyleSheet.absoluteFill,
    fontSize: 128,
    width: Dimensions.get('window').width,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 18,
  },
});

// create animated textInput component
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Counter = ({ toValue, duration }) => {
  let resume = false;
  let stop = false;
  let reset = false;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();

  const animation = useCallback(
    toValue => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        console.log(finished);
      });
    },
    [animatedValue]
  );

  useEffect(() => {
    // starts animation
    animation(toValue);

    // listen to animated value changes and
    // update textInput text
    animatedValue.addListener(animated => {
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: String(Math.round(animated.value)),
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [animatedValue]);

  const _restartAnimation = () => {
    animatedValue.setValue(0);
    animation(toValue);
  };

  return (
    <>
      <AnimatedTextInput
        ref={inputRef}
        style={styles.counter}
        defaultValue="0"
        editable={false}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity
        onClick={_restartAnimation}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </>
  );
};

export default Counter;
