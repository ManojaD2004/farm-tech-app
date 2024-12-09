import { StyleSheet, Image, useColorScheme } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  useEffect(() => {
    async function execThis() {
      try {
        const value = await AsyncStorage.getItem("key");
        if (value !== null) {
          console.log(value);
        }
      } catch (error) {
        console.log(error);
      }
    }
    execThis();
  });
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/futuristic-farming-automation-modern-agriculture-field-farming-technology-ai-generative-agtech-smart-farming-futuristic-farming-270040095.jpg",
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          className={`${
            colorScheme === "light" ? "!text-slate-700" : "!text-slate-200"
          }`}
        >
          See your history. All your given commodities with price
        </ThemedText>
      </ThemedView>
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="defaultSemiBold">View History</ThemedText>
      </ThemedView> */}
      <ThemedView style={styles.titleContainer}>
        <List.Section className="!w-full !p-0 !m-0">
          <List.Accordion
            title={new Date().toUTCString()}
            left={(props) => (
              <List.Icon
              
                style={{ paddingLeft: 10 }}
                icon="clock-time-eight-outline"
              />
            )}
          >
            <List.Item
              className="!w-full !p-0 !m-0"
              title="First Item"
              description="Item description"
              // apple
              left={(props) => (
                <List.Icon
                  color="red"
                  style={{ paddingLeft: 10 }}
                  icon="apple"
                />
              )}
            />
          </List.Accordion>
        </List.Section>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
