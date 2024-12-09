import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push("/(tabs)"); // Replace '/home' with your desired route
    }, 10000); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
       <LottieView
         source={require("../assets/images/farmanimation.json")} // Replace with your Lottie animation file
         autoPlay
         loop
         style={styles.lottie} // Ensure animation completes
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff", // Match the animation background
    },
    mainApp: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    lottie: {
      width: 300,
      height: 300,
    },
  });

export default SplashScreen;
