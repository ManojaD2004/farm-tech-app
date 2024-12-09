import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push("/(tabs)"); 
    }, 1300);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
       <LottieView
         source={require("../assets/images/farmanimation.json")} 
         autoPlay
         loop
         style={styles.lottie} 
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
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
