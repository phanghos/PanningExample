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
  withTiming,
} from 'react-native-reanimated';

const CIRCLE_SIZE = 100;
const GREEN = '#1DB954';
const SCALE_INITIAL = 1;
const SCALE_FINAL = 1.2;

const App = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const isPressed = useSharedValue(false);
  const scale = useSharedValue(SCALE_INITIAL);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      offsetX.value = posX.value;
      offsetY.value = posY.value;
      isPressed.value = true;
      scale.value = SCALE_FINAL;
    })
    .onUpdate(({ translationX, translationY }) => {
      posX.value = translationX + offsetX.value;
      posY.value = translationY + offsetY.value;
    })
    .onFinalize(() => {
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

export default App;

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
