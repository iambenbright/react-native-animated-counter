import React, { useEffect, useRef, useCallback } from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const styles = StyleSheet.create({
  counter: {
    ...StyleSheet.absoluteFill,
    fontSize: 128,
    width: Dimensions.get('window').width,
    textAlign: 'center',
  },
});

// create animated textInput component
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Counter = ({ toValue, duration }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();

  const animation = useCallback(
    toValue => {
      return Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      });
    },
    [animatedValue]
  );

  useEffect(() => {
    // starts animation
    animation(toValue).start();

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

  return (
    <>
      <AnimatedTextInput
        ref={inputRef}
        style={styles.counter}
        defaultValue="0"
        editable={false}
        underlineColorAndroid="transparent"
      />
    </>
  );
};

export default Counter;
