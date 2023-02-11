import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CIRCLE_SIZE, GREEN, SCALE_FINAL, SCALE_INITIAL } from './constants';

const RNGH1WithSnapping = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const isPressed = useSharedValue(false);
  const scale = useSharedValue(SCALE_INITIAL);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart(_) {
      isPressed.value = true;
      scale.value = SCALE_FINAL;
    },
    onActive({ translationX, translationY }) {
      posX.value = translationX;
      posY.value = translationY;
    },
    onFinish() {
      posX.value = withTiming(0);
      posY.value = withTiming(0);
      isPressed.value = false;
      scale.value = SCALE_INITIAL;
    },
  });

  const as = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      { translateY: posY.value },
      { scale: withTiming(scale.value) },
    ],
    backgroundColor: isPressed.value ? 'black' : GREEN,
  }));

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.circle, as]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default RNGH1WithSnapping;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: GREEN,
  },
});
