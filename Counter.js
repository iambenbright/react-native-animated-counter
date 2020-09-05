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
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();
  let isComplete = false;

  const animation = useCallback(
    toValue => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        console.log(finished);
        if (finished) isComplete = true;
        else isComplete = false;
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

  const _stopAnimation = () => {
    animatedValue.stopAnimation();
  };

  const _resumeAnimation = () => {
    !isComplete && animation(toValue);
  };

  const _resetAnimation = () => {};

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
      <TouchableOpacity
        onClick={_resumeAnimation}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity onClick={_stopAnimation} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onClick={_resetAnimation}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </>
  );
};

export default Counter;
