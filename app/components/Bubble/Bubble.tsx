import { Image, StyleSheet, Animated, ImageSourcePropType } from "react-native";
import React, { useRef, useEffect } from "react";

import oxygenImg from "../../../assets/images/Oxygen.png";


interface BubbleAnimationProps {
  x: number;
  y: number;
}

const BubbleAnimation: React.FC<BubbleAnimationProps> = ({ x, y }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 700,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [translateY, opacity]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        { left: x, top: y, transform: [{ translateY }], opacity },
      ]}
    >
      <Image source={oxygenImg as ImageSourcePropType} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    zIndex: 9999999999,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default BubbleAnimation;
