import React, { useState, useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

const BlinkText = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  //   const [animating, setAnimating] = useState(true);

  const blinkAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      blinkAnimation.stopAnimation();
    };
  }, []);

  const blinkStyle = {
    opacity: blinkAnimation,
  };

  return (
    <Animated.Text className={className} style={[blinkStyle]}>
      {text}
    </Animated.Text>
  );
};

export default BlinkText;
