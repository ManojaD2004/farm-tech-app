import { Image, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import InputText from "@/components/InputText";
import BlinkText from "@/components/BlinkText";
import { Dropdown } from "react-native-paper-dropdown";

const stateDistrict = {
  Karnataka: [
    { label: "Bagalkot", value: "Bagalkot" },
    { label: "Bangalore Rural", value: "Bangalore Rural" },
    { label: "Bangalore Urban", value: "Bangalore Urban" },
    { label: "Belagavi (Belgaum)", value: "Belagavi (Belgaum)" },
    { label: "Ballari (Bellary)", value: "Ballari (Bellary)" },
    { label: "Bidar", value: "Bidar" },
    { label: "Chamarajanagar", value: "Chamarajanagar" },
    {
      label: "Chikkamagaluru (Chikmagalur)",
      value: "Chikkamagaluru (Chikmagalur)",
    },
    { label: "Chitradurga", value: "Chitradurga" },
    { label: "Davanagere", value: "Davanagere" },
    { label: "Dharwad", value: "Dharwad" },
    { label: "Gadag", value: "Gadag" },
    { label: "Gulbarga (Kalaburagi)", value: "Gulbarga (Kalaburagi)" },
    { label: "Hassan", value: "Hassan" },
    { label: "Haveri", value: "Haveri" },
    { label: "Kodagu", value: "Kodagu" },
    { label: "Kolar", value: "Kolar" },
    { label: "Koppal", value: "Koppal" },
    { label: "Mandya", value: "Mandya" },
    { label: "Mysuru (Mysore)", value: "Mysuru (Mysore)" },
    { label: "Raichur", value: "Raichur" },
    { label: "Ramanagara", value: "Ramanagara" },
    { label: "Shimoga (Shivamogga)", value: "Shimoga (Shivamogga)" },
    { label: "Tumakuru (Tumkur)", value: "Tumakuru (Tumkur)" },
    { label: "Udupi", value: "Udupi" },
    { label: "Uttara Kannada (Karwar)", value: "Uttara Kannada (Karwar)" },
    { label: "Vijayapura (Bijapur)", value: "Vijayapura (Bijapur)" },
    { label: "Vidhana Soudha", value: "Vidhana Soudha" },
    { label: "Yadgir", value: "Yadgir" },
    { label: "Chikkaballapur", value: "Chikkaballapur" },
    {
      label: "Dakshina Kannada (Mangalore)",
      value: "Dakshina Kannada (Mangalore)",
    },
  ],
};

type StateInIndia = keyof typeof stateDistrict;

const stateOptions: { label: string; value: StateInIndia }[] = [
  { label: "Karnataka", value: "Karnataka" },
];

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [state, setState] = useState<StateInIndia>();
  const [district, setDistrict] = useState<string>();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: "https://img.freepik.com/premium-photo/digital-art-modern-farmer-using-advanced-technology-farm_702840-434.jpg",
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome To Farm Tech!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <BlinkText
          text={"You have not logged in. Start by entering your deatils!"}
          className="!text-red-500 text-xl"
        />
        <ThemedText type="subtitle">Step 1: Enter your Name</ThemedText>
        <InputText
          label="Name"
          placeholder="Type your name"
          text={text}
          setText={setText}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Select Your State</ThemedText>
        <Dropdown
          label="State"
          mode="outlined"
          placeholder="Select State"
          options={stateOptions}
          value={state}
          onSelect={(val) => {
            if (val !== undefined) {
              setState(val as StateInIndia);
            }
          }}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Select Your District</ThemedText>
        {state !== undefined ? (
          <Dropdown
            label="District"
            mode="outlined"
            placeholder="Select Gender"
            options={stateDistrict[state]}
            value={district}
            onSelect={(val) => {
              if (val !== undefined) {
                setDistrict(val);
              }
            }}
          />
        ) : (
          <ThemedText className="!text-yellow-800">
            Select a <ThemedText type="defaultSemiBold">State first</ThemedText>{" "}
          </ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Enter your Contact Details</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
