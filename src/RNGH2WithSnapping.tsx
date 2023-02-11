import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { CIRCLE_SIZE, GREEN, SCALE_FINAL, SCALE_INITIAL } from './constants';

const RNGH2WithSnapping = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const isPressed = useSharedValue(false);
  const scale = useSharedValue(SCALE_INITIAL);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      scale.value = SCALE_FINAL;
    })
    .onUpdate(({ translationX, translationY }) => {
      posX.value = translationX;
      posY.value = translationY;
    })
    .onFinalize(() => {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
      isPressed.value = false;
      scale.value = SCALE_INITIAL;
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
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.circle, as]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default RNGH2WithSnapping;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#1DB954',
  },
});
