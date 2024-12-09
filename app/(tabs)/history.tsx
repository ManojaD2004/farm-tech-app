import { StyleSheet, Image, useColorScheme } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONSTANT from "../constant";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(true);
  const [history, setHistory] = useState([]);

  const handlePress = () => setExpanded(!expanded);
  useEffect(() => {
    async function execThis() {
      try {
        const value = await AsyncStorage.getItem("mandi-id");
        if (value !== null) {
          console.log(value);
          const reqBody = {
            mandiId: parseInt(value),
          };
          const res = await fetch(
            `${CONSTANT.backendLink}/categories-commodities`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reqBody),
            }
          );
          const jsonRes = await res.json();

          setHistory(jsonRes);
        }
      } catch (error) {
        console.log(error);
      }
    }
    execThis();
  }, [expanded]);
  console.log(history);
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
            onPress={handlePress}
            title={new Date().toUTCString()}
            left={(props) => (
              <List.Icon
                style={{ paddingLeft: 10 }}
                icon="clock-time-eight-outline"
              />
            )}
          >
            {Array.isArray(history) &&
              history.map((ele: any, index) => (
                <List.Item
                  key={index}
                  className="!w-full !p-0 !m-0"
                  title={capitalizeFirstLetter(ele.commodity_name)}
                  description={`Category: ${ele.category_name}, Type: ${ele.grade_type}, Price: ${ele.grade_price}`}
                  // apple
                  left={(props) => (
                    <List.Icon
                      color={
                        capitalizeFirstLetter(ele.category_name) === "Fruit"
                          ? "red"
                          : "orange"
                      }
                      style={{ paddingLeft: 10 }}
                      icon={
                        capitalizeFirstLetter(ele.category_name) === "Fruit"
                          ? "apple"
                          : "carrot"
                      }
                    />
                  )}
                />
              ))}
          </List.Accordion>
        </List.Section>
      </ThemedView>
    </ParallaxScrollView>
  );
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
